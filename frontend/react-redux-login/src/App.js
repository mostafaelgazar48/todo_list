import React, { useState, useEffect, useCallback } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Tasks from './components/Tasks';
import UserTasks from './components/UserTasks';
import Login from './components/Login';
import authService from './services/auth-service';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Home from "./components/Home";
function App() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(authService.logout());
  }, [dispatch]);

  return (

    <div className="App">

      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              Master Linux

            </Link>
            <li className="navbar-nav">
                    <Link to={"/"} className="nav-link">
                    Home
                    </Link>
                  </li>
            <div className="navbar-nav mr-auto" style={{ display:'contents' }}>

              {currentUser ? (
                <div className="navbar-nav float-right ml-auto">

                  <li className="nav-item">
                    <Link to={"/profile"} className="nav-link">
                     Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={logOut}>
                      LogOut
                    </a>
                  </li>
                </div>
              ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                  </li>


                </div>
              )}
              </div>
          </nav>


          <div className="container mt-3">
            <Routes>
            <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/tasks" element={<UserTasks />} />
              <Route exact path="/profile" element={<Tasks />} />

            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
