import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const initialState = {
  user: [],
  loading: false,
  products: [],

  flag: false,
};

export const signInUser = createAsyncThunk("signInUser", async (body) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/users/login`,
      body
    );

    localStorage.setItem("token", response.data.data.refreshToken);

    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

export const signUpUser = createAsyncThunk("signUpUser", async (body) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/users/register`,
      body
    );
    toast.success(response.data.message);

    console.log("Response Register:", response.data);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

export const getProducts = createAsyncThunk("get/getProduct", async () => {
  const response = await axios.get(`https://dummyjson.com/products`);
  return response.data;
});
const authSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.clear();
      console.log("Logout User Successfully");
      location.reload();
    },
  },

  extraReducers: (builder) => {
    builder

      // register
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.user.push(action.payload);
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state) => {
        state.flag = true;
      })
      // login
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user.push(action.payload);
      })
      .addCase(signInUser.rejected, (state) => {
        state.loading = true;
      })
      // get product
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
