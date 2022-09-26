import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const homeNavigate = () => {
    navigate("/");
  };
  const navigate = useNavigate();
  const TokenRemove = () => {
    localStorage.setItem("jwt-token", "");
    navigate("/");
  };
  return (
    <>
      <div className="Navbar-parent">
        <div className="Navbar-children">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt=""
              className="Navbar-logo"
              onClick={homeNavigate}
            />
          </div>
          <div className="nav-items">
            <a className="home-item" href="/Home">
              Home
            </a>
            <a className="home-item" href="/Jobs">
              Jobs
            </a>
          </div>
          <div>
            <button className="btn btn-primary" onClick={TokenRemove}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
