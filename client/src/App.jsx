import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Register from "./pages/Register";

import { useDispatch } from "react-redux";
import { logout } from "./redux/authSlice";
import UpdatePost from "./components/UpdatePost";
import RegUser from "./pages/RegUser";
import LogUser from "./pages/LogUser";
function App() {
  const dispatch = useDispatch();
  return (
    <>
      <BrowserRouter>
        <div>
          <h1>Social Lite</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>

              <li>
                <Link to="/logout" onClick={() => dispatch(logout())}>
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <Routes>
          <Route element={<LoginPage />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route path="/update-post/:id" element={<UpdatePost />} />
          <Route path="/reg-user" element={<RegUser />} />
          <Route path="/log-user" element={<LogUser />} />
          <Route element={<ProtectedRoutes />}>
            <Route element={<HomePage />} path="/" />
            <Route element={<ProfilePage />} path="/profile" />
            <Route element={<LogoutPage />} path="/logout" />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
