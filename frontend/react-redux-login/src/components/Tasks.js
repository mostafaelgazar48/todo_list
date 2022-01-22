import React from "react";
import {  useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const Tasks = () => {

  const { user: currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!currentUser) {
    navigate('/login')
  }

  return (
    <div className="container">
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.user._id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.user.email}
      </p>

    </div>
  );
};

export default Tasks;
