import { useState, useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  getAllTasks,
  deleteTask,
  updateTask,
  createTask, // Add the createTask action
} from "../redux/features/taskSlice";
import EditTaskModal from "../components/EditTaskModal";

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

const Task: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null); // For edit or add mode
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<"All" | "Pending" | "Completed">("All");

  const dispatch = useDispatch<AppDispatch>();
  const tasks: Task[] = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  const handleDeleteTask = async (_id: string) => {
    const response = await dispatch(deleteTask(_id));
    if (response.meta.requestStatus === "fulfilled") {
      dispatch(getAllTasks());
    }
  };

  const handleToggleComplete = async (_id: string) => {
    const task = tasks.find((t) => t._id === _id);
    if (task) {
      const updatedStatus = !task.completed;
      const response = await dispatch(
        updateTask({
          taskId: _id,
          updates: { title: task.title, description: task.description, completed: updatedStatus },
        })
      );
      if (response.meta.requestStatus === "fulfilled") {
        dispatch(getAllTasks());
      }
    } else {
      console.error(`Task with id ${_id} not found.`);
    }
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task); // Set the task to be edited
    setIsModalOpen(true);
  };

  const handleSaveTask = async (task: { title: string; description: string }) => {
    if (currentTask) {
      // Editing mode
      const response = await dispatch(
        updateTask({
          taskId: currentTask._id,
          updates: { ...task, completed: currentTask.completed },
        })
      );
      if (response.meta.requestStatus === "fulfilled") {
        dispatch(getAllTasks());
      }
    } else {
      // Adding a new task
      const response = await dispatch(
        createTask({
          ...task,
           // Default to false for new tasks
        })
      );
      if (response.meta.requestStatus === "fulfilled") {
        dispatch(getAllTasks());
      }
    }
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "All" ||
      (filterStatus === "Completed" && task.completed) ||
      (filterStatus === "Pending" && !task.completed);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 mb-60">
      <div className="flex items-center justify-between mb-10">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={() => {
            setCurrentTask(null); // Clear for add mode
            setIsModalOpen(true);
          }}
        >
          Add Task
        </button>
        <EditTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSaveTask={handleSaveTask}
          initialData={currentTask} // Pass the current task for editing
        />
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as "All" | "Pending" | "Completed")}
          className="border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map((task) => (
          <div
            key={task._id}
            className="border border-gray-300 rounded-md p-4 shadow-md flex flex-col justify-between"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">{task.title}</h3>
              <div className="flex space-x-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600"
                  onClick={() => handleEditTask(task)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="mb-4">{task.description}</p>
            <button
              className={`px-4 py-2 rounded-md text-white ${
                task.completed ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 hover:bg-gray-600"
              }`}
              onClick={() => handleToggleComplete(task._id)}
            >
              {task.completed ? "Mark as Pending" : "Mark as Completed"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;
