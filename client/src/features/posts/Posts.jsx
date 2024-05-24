import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsync, deleteAsync, updatePostAsync } from "./postsSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Posts() {
  const items = useSelector((state) => state.post.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsync());
  }, []);

  // const data = JSON.stringify(items);

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {items.data?.map((data) => (
          <div key={data._id}>
            <div className="">
              <img src={data.img} alt="img" width={250} height={250} />
            </div>
            <div>
              <h5>{data.title}</h5>
              <p>{data.description}</p>
            </div>
            <div className="">
              <button onClick={() => dispatch(updatePostAsync(data._id))}>
                Edit
              </button>
              <button onClick={() => dispatch(deleteAsync(data._id))}>
                Delete
              </button>
            </div>
          </div>
        ))}
        <ToastContainer />
      </div>
    </>
  );
}

export default Posts;
