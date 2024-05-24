import React from "react";
import CreatePost from "../components/CreatePost";
import { useSelector } from "react-redux";
import UpdatePost from "../components/UpdatePost";
const ProfilePage = () => {
  const loggedUser = useSelector((state) => state.user.user[0]?.data.email);
  console.log(loggedUser);
  return (
    <>
      <div>ProfilePage</div>
      <div>{loggedUser}</div>
      <CreatePost />
      <UpdatePost />
    </>
  );
};

export default ProfilePage;
