import React, { useState } from "react";
import { object, string } from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

let userSchema = object({
  username: string().required().min(2).max(20),
  password: string().required().min(5).max(20),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const [LoginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [ErrorLoginData, setErrorLoginData] = useState({
    username: "",
    password: "",
  });

  //=================================================
  //collecting form Data
  //=================================================

  const handleChange = (key, value) => {
    setLoginData({ ...LoginData, [key]: value });
  };
  //============================
  // data sent to the server
  //===========================

  const SuccessDataFunction = async () => {
    await axios({
      method: "POST",
      url: "https://apis.ccbp.in/login",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        username: LoginData["username"],
        password: LoginData["password"],
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setLoginData({});
          console.log(response);
          toast.success("Login Successful!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          localStorage.setItem("jwt-token", response.data.jwt_token);
          navigate("/Home");
        }
      })
      .catch((axioserror) => {
        console.log(axioserror);
      });
  };

  //==================================================
  //validating the form data and send it to the server
  //==================================================

  const handleSubmit = (e) => {
    e.preventDefault();
    userSchema
      .validate(LoginData, { abortEarly: false })
      .then((res) => {
        SuccessDataFunction(LoginData);
      })
      .catch((error) => {
        console.log("error at validation", error);
        let obj = {};
        error.inner.map((element, index) => {
          obj[element.path] = element.message;
        });
        setErrorLoginData(obj);
      });
  };

  return (
    <>
      <div className="Loginform-parent">
        <div className="form-section d-flex justify-content-center align-items-center p-2">
          <form className="formdiv shadow-lg" onSubmit={handleSubmit}>
            <div className="formlogo mt-1 mb-1">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt=""
                className="formlogoimage"
              />
            </div>
            <div className="hello-form">
              <div className="formdata mt-2">
                <div>
                  <label htmlFor="Name" className="lablename">
                    Name
                  </label>
                  <br />
                  <input
                    type="text"
                    className="inputfield"
                    autoComplete="on"
                    onChange={(e) => {
                      handleChange("username", e.target.value);
                    }}
                  />
                  <p className="text-danger">{ErrorLoginData.username}</p>
                </div>
                <div>
                  <label htmlFor="Name" className="lablename">
                    Password
                  </label>
                  <br />
                  <input
                    type="password"
                    autoComplete="on"
                    className="inputfield"
                    onChange={(e) => {
                      handleChange("password", e.target.value);
                    }}
                  />
                  <p className="text-danger">{ErrorLoginData.password}</p>
                </div>
                <button className="btn btn-primary mt-4 mb-4 w-100">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
