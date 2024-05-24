import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deletePost, fetchPosts, updatePost } from "./postsAPI";
import axios from "axios";
import { toast } from "react-toastify";
const initialState = {
  posts: [],
  status: "idle",
};

export const sendPostAsync = createAsyncThunk("post/sendPost", async (body) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/users/send-posts`,
      body
    );

    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

export const updatePostAsync = createAsyncThunk(
  "cart/updateCartItem",
  async ({ id, updatedItem }) => {
    const response = await updatePost(id, updatedItem);
    console.log("Update Post Response: ", response);
    return response.data;
  }
);
export const fetchAsync = createAsyncThunk("post/fetchPosts", async () => {
  const response = await fetchPosts();
  return response.data;
});

export const deleteAsync = createAsyncThunk("post/deletePost", async (_id) => {
  try {
    const response = await deletePost(_id);

    console.log("Deleted Response post", response);
    toast.success(response.data.data);
    return response.data;
  } catch (error) {
    console.log("Error while deleting post", error);
    toast.error(error.response.data);
  }
});

export const productsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = "null";
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.posts = action.payload;
      })
      .addCase(fetchAsync.rejected, (state) => {
        state.status = "null";
      })
      .addCase(deleteAsync.pending, (state) => {
        state.status = "null";
      })
      .addCase(deleteAsync.fulfilled, (state, action) => {
        state.status = action.payload;
        const index = state.posts.findIndex(
          (item) => item.id === action.payload
        );
        state.posts.splice(index, 1);
      })
      .addCase(deleteAsync.rejected, (state) => {
        state.status = "null";
      })
      .addCase(sendPostAsync.pending, (state) => {
        state.status = "null";
      })
      .addCase(sendPostAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.posts = action.payload;
      })
      .addCase(sendPostAsync.rejected, (state) => {
        state.status = "null";
      })
      .addCase(updatePostAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );

        state.items.splice(index, 1, action.payload);
      });
  },
});

export default productsSlice.reducer;

/*
 .addCase(addAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })

.addCase(updateAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );

        state.items.splice(index, 1, action.payload);
      });
*/
