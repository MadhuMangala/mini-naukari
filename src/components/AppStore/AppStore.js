import React from "react";
import "../LoginPage/LoginForm.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Navbar from "../Navbar/Navbar";
// import DetailsView from "../Detailsview/DetailsView";
import BrRoutes from "../Routing/BrRoutes";
const AppStore = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrRoutes />

      {/* <ModuleCollector /> */}
    </>
  );
};

export default AppStore;
