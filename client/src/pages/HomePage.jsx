import { useDispatch, useSelector } from "react-redux";
import Posts from "../features/posts/Posts";
import { getProducts } from "../redux/authSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.user.products);

  return (
    <>
      <div>Home Page</div>
      <Posts />
      <button onClick={() => dispatch(getProducts())}>Get</button>
      <div>
        <div>
          {items.products?.map((article) => (
            <div key={article.id}>{article.title}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
