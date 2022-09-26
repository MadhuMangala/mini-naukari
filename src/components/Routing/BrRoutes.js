import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "../LoginPage/LoginForm";
import Homepage from "../HomePage/Homepage";
import DetailsView from "../Detailsview/DetailsView";
import ModuleCollector from "../JobsModule/ModuleCollector";

const BrRoutes = () => {
  const token_check = () => {
    let token = localStorage.getItem("jwt-token");
    let has_it = token !== "";
    return has_it;
  };

  const ProtectiveRoute = (props) => {
    console.log(props);
    let token_bool = token_check();
    if (token_bool) {
      return props.children;
    }

    return <Navigate to="/" />;
  };
  const UnProtectiveRoute = (props) => {
    let token_bool = token_check();
    if (token_bool) {
      return <Navigate to="/Home" />;
    }

    return props.children;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/Home"
            element={
              <ProtectiveRoute>
                <Homepage />
              </ProtectiveRoute>
            }
          />
          <Route
            exact
            path="/Jobs"
            element={
              <ProtectiveRoute>
                <ModuleCollector />
              </ProtectiveRoute>
            }
          />
          <Route
            exact
            path="/"
            element={
              <UnProtectiveRoute>
                <LoginForm />
              </UnProtectiveRoute>
            }
          />
          <Route
            exact
            path="/Jobs/:id"
            element={
              <ProtectiveRoute>
                <DetailsView />
              </ProtectiveRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default BrRoutes;
