import axios from "axios";

// fetch posts for dashboard
export function fetchPosts() {
  return axios.get(`http://localhost:8080/api/v1/users/get-posts`);
}

// delete post
export function deletePost(_id) {
  return axios.delete(`http://localhost:8080/api/v1/users/delete-posts/${_id}`);
}

// update the original post content
export function updatePost(_id, formData) {
  return axios.put(
    `http://localhost:8080/api/v1/users/edit-posts/` + _id,
    formData
  );
}

// get post details for update page
export function getEditPost(_id) {
  return axios.get(`http://localhost:8080/api/v1/users/get-edit-post/` + _id);
}

// send post
export function sendPost(formData) {
  return axios.post(`http://localhost:8080/api/v1/users/send-posts`, formData);
}
