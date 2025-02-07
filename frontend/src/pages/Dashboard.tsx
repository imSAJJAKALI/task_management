import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { getAllTasks } from "../redux/features/taskSlice";
import { RootState } from "../redux/store"; // Ensure you import the correct `RootState` from your store configuration.

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks) as Task[];

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  const completedTasksCount = tasks.filter((task) => task.completed).length;
  const pendingTasksCount = tasks.filter((task) => !task.completed).length;

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-gray-700 mt-20">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl  mb-60">
        <div className="bg-green-200 p-6 rounded-lg shadow-md text-center ">
          <h2 className="text-xl font-bold text-green-800">Completed Tasks</h2>
          <p className="text-4xl font-semibold text-green-900">{completedTasksCount}</p>
        </div>
        <div className="bg-red-200 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold text-red-800">Pending Tasks</h2>
          <p className="text-4xl font-semibold text-red-900">{pendingTasksCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
