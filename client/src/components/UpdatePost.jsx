import React, { useEffect, useState } from "react";

import axios from "axios";

//toast

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8080/api/v1/users/get-edit-post/` + id)
  //     .then((res) => {
  //       console.log(res);
  //       setFormData({
  //         ...formData,
  //         title: res.data.data.title,
  //         description: res.data.data.description,
  //         img: res.data.data.img,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    img: "",
  });

  const [file, setFile] = useState();

  function handleFileChange(e) {
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

    // try {
    //   await axios
    //     .put(
    //       `http://localhost:8080/api/v1/users/get-edit-post/` + id,
    //       formDataToSend,
    //       {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       toast.success(response.data.message);
    //       navigate("/dashboard");
    //     })
    //     .then(() => {});
    // } catch (error) {
    //   toast.error(error.response.data.message);
    // }
  };

  return (
    <>
      <div>
        <h1 className="text-2xl text-center font-bold">Update Post</h1>
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
            <input type="file" name="img" onChange={handleFileChange} />
          </label>
          <br />
          <br />
          <button
            onClick={handleSubmit}
            style={{ backgroundColor: "green", width: "100%", color: "white" }}
          >
            Update Post
          </button>
          <br />
          <br />

          <ToastContainer />
        </form>
      </div>
    </>
  );
};

export default UpdatePost;
