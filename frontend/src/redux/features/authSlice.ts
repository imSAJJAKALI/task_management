import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const url:String= "https://task-management-two-steel.vercel.app";

// Define the types for the state
interface AuthState {
  user: any | null; // Adjust `any` to your user type
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Define types for login and signup payloads
interface LoginPayload {
  email: string;
  password: string;
}

interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

// Async thunk for login
export const login = createAsyncThunk(
    "auth/login",
    async (payload: LoginPayload, { rejectWithValue }) => {
      const toastId = toast.loading("Logging in...");
      try {
        const response = await axios.post(`${url}/api/auth/login`, payload);
        toast.success("Login successful!", { id: toastId });
        localStorage.setItem("userAuth",JSON.stringify(response))
        return response.data; // Assume API response has { user, token }
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
        toast.error(errorMessage, { id: toastId });
        return rejectWithValue(errorMessage);
      }
    }
  );

// Async thunk for signup
export const signup = createAsyncThunk(
    "auth/register",
    async (payload: SignupPayload, { rejectWithValue }) => {
      const toastId = toast.loading("Signing up...");
      try {
        const response = await axios.post(`${url}/api/auth/register`, payload);
        toast.success("Signup successful!", { id: toastId });
        return response.data; // Assume API response has { user, token }
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
        toast.error(errorMessage, { id: toastId });
        return rejectWithValue(errorMessage);
      }
    }
  );

// Create the auth slice
const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<{ user: any; token: string }>) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Signup
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state, action: PayloadAction<{ user: any; token: string }>) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
