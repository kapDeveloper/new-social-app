import React, { useState } from "react";

import { useDispatch } from "react-redux";
//toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendPostAsync } from "../features/posts/postsSlice";
const CreatePost = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [file, setFile] = useState();

  function handlefileChange(e) {
    setFile(e.target.files[0]);
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        rememberPassword: { ...formData.rememberPassword, [name]: checked },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    if (file) {
      formDataToSend.append("img", file);
    }

    try {
      dispatch(sendPostAsync(formDataToSend));
    } catch (error) {
      console.error("Error while sending post", error);
    }

    setFormData({
      title: "",
      description: "",
    });
  };
  return (
    <>
      <div>
        <h1 className="text-2xl text-center font-bold">Create Post</h1>
      </div>
      <div className="flex bg-teal-200 justify-center">
        <form>
          <label htmlFor="title">
            Title: <br />
            <input
              type="text"
              name="title"
              id=""
              className="input"
              onChange={handleChange}
              value={formData.title}
            />
          </label>
          <br />
          <label htmlFor="description">
            Description: <br />
            <textarea
              name="description"
              id=""
              cols="30"
              rows="5"
              className="input"
              onChange={handleChange}
              value={formData.description}
            ></textarea>
          </label>
          <br />
          <label htmlFor="image">
            Image: <br />
            <input type="file" name="img" onChange={handlefileChange} />
          </label>
          <br />
          <br />
          <button
            onClick={handleSubmit}
            style={{ backgroundColor: "green", width: "100%", color: "white" }}
          >
            Post
          </button>
          <br />
          <br />

          <ToastContainer />
        </form>
      </div>
    </>
  );
};

export default CreatePost;
