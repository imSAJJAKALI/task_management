import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// Define the base URL for the API
const url: string = "https://task-management-two-steel.vercel.app";


// Define the types for the state
interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}


interface TaskState {
  tasks: Task[]; // List of all tasks
  task: Task | null; // Single task
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: TaskState = {
  tasks: [],
  task: null,
  loading: false,
  error: null,
};

// Async thunk to fetch all tasks
export const getAllTasks = createAsyncThunk(
  "tasks/getAllTasks",
  async (_, { rejectWithValue }) => {
    try {
      // Retrieve the token from localStorage or state
      const token = localStorage.getItem("userAuth")
        ? JSON.parse(localStorage.getItem("userAuth") || "").data.token
        : null;

      // Set the Authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Assuming you're using Bearer tokens
        },
      };

      const response = await axios.get(`${url}/api/tasks`, config);
      return response.data; // Assume response contains the list of tasks
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch tasks.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk to fetch a single task by ID
export const getTask = createAsyncThunk(
  "tasks/getTask",
  async (taskId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userAuth")
        ? JSON.parse(localStorage.getItem("userAuth") || "").data.token
        : null;

      // Set the Authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Assuming you're using Bearer tokens
        },
      };
      const response = await axios.get(`${url}/api/tasks/${taskId}`,config);
      return response.data; // Assume response contains the task details
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch task.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk to create a task
export const createTask = createAsyncThunk(
    "tasks/createTask",
    async (task:any, { rejectWithValue }) => {
      const toastId = toast.loading("Creating task...");
     
      try {
        // Retrieve the token safely
        const userAuth = localStorage.getItem("userAuth");
        const token = userAuth ? JSON.parse(userAuth).data.token : null;
  
        if (!token) {
          throw new Error("Authentication token is missing. Please log in.");
        }
  
        // Set the Authorization header
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Assuming you're using Bearer tokens
            "Content-Type": "application/json", // Ensure content type is set
          },
        };
  
        // Perform the API request
        
        const response = await axios.post(`${url}/api/tasks`, task, config);
  
        // Show success toast and return the response
        toast.success("Task created successfully!", { id: toastId });
        return response.data; // Assume response contains the created task
      } catch (error: any) {
        // Handle errors and show toast
        const errorMessage =
          error.response?.data?.message || error.message || "Failed to create task.";
        toast.error(errorMessage, { id: toastId });
  
        // Reject with the error message
        return rejectWithValue(errorMessage);
      }
    }
  );
  

// Async thunk to update a task
export const updateTask = createAsyncThunk(
    "tasks/updateTask",
    async (
      { taskId, updates }: { taskId: string; updates: Partial<Task> },
      { rejectWithValue }
    ) => {
      const toastId = toast.loading("Updating task...");
      try {
        const token = localStorage.getItem("userAuth")
          ? JSON.parse(localStorage.getItem("userAuth") || "").data.token
          : null;
  
        // Set the Authorization header
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Assuming you're using Bearer tokens
          },
        };
  
        // API call
        const response = await axios.patch(
          `${url}/api/tasks/${taskId}`,
          updates,
          config
        );
  
        toast.success("Task updated successfully!", { id: toastId });
        return response.data; // Assume response contains the updated task
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Failed to update task.";
        toast.error(errorMessage, { id: toastId });
        return rejectWithValue(errorMessage);
      }
    }
  );

// Async thunk to delete a task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: string, { rejectWithValue }) => {
    const toastId = toast.loading("Deleting task...");
    try {
      const token = localStorage.getItem("userAuth")
        ? JSON.parse(localStorage.getItem("userAuth") || "").data.token
        : null;

      // Set the Authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Assuming you're using Bearer tokens
        },
      };
      await axios.delete(`${url}/api/tasks/${taskId}`, config);
      toast.success("Task deleted successfully!", { id: toastId });
      return taskId; // Return the deleted task ID
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete task.";
      toast.error(errorMessage, { id: toastId });
      return rejectWithValue(errorMessage);
    }
  }
);

// Create the task slice
const taskSlice = createSlice({
  name: "taskReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all tasks
    builder.addCase(getAllTasks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getAllTasks.fulfilled,
      (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
        state.error = null;
      }
    );
    builder.addCase(getAllTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch a single task
    builder.addCase(getTask.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getTask.fulfilled, (state, action: PayloadAction<Task>) => {
      state.loading = false;
      state.task = action.payload;
      state.error = null;
    });
    builder.addCase(getTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create a task
    builder.addCase(createTask.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      createTask.fulfilled,
      (state, action: PayloadAction<Task>) => {
        state.loading = false;
        state.tasks.push(action.payload);
        state.error = null;
      }
    );
    builder.addCase(createTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update a task
    builder.addCase(updateTask.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      updateTask.fulfilled,
      (state, action: PayloadAction<Task>) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        state.error = null;
      }
    );
    builder.addCase(updateTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete a task
    builder.addCase(deleteTask.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      deleteTask.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
        state.error = null;
      }
    );
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

// Export the reducer
export default taskSlice.reducer;
