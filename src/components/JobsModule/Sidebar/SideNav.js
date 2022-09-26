import axios from "axios";
import React, { useEffect, useState } from "react";
import "./SideNav.css";
import JobsCardBody from "../Jobcards/JobsCardBody";

const SideNav = ({ Func }) => {
  const [ProfileApidata, setProfileDataApi] = useState([]);
  const [checkedData, setCheckedData] = useState({});

  const Employement = ["FULLTIME", "PARTTIME", " FREELANCER", "INTERNSHIP"];
  const salaryRange = [
    "10 LPA and above",
    "20 LPA and above",
    " 30 LPA and above",
    "40 LPA and above",
  ];
  const ProfileApi = () => {
    axios({
      method: "GET",
      url: "https://apis.ccbp.in/profile",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log(res, "res from profile");
          setProfileDataApi([res.data.profile_details]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    ProfileApi();
  }, []);
  return (
    <>
      <div className="d-flex">
        <div className="sidebarleft-div">
          <div className="sidebarleftchild-div">
            <div className="top-card-div">
              {ProfileApidata.map((element, index) => {
                return (
                  <div className="top-card-div-items" key={index}>
                    <div className="top-card-profile">
                      <img
                        src={element.profile_image_url}
                        alt=""
                        className="w-100"
                      />
                    </div>
                    <div className="top-card-name mt-2 mb-2">
                      <h2 className="top-card-name-text">{element.name}</h2>
                    </div>
                    <div className="top-card-description mt-3 mb-2">
                      <p className="top-card-description-text ">
                        {element.short_bio}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 mb-4">
              <hr className="horizontal-line" />
            </div>
            <div className="typeofEmp-div">
              <div className="typeofEmp-child-div-heading">
                <h5 className="mb-4">Type of Employement</h5>
                {Employement.map((element, index) => {
                  return (
                    <div className="typeofEmp-child-div-label" key={index}>
                      <input
                        type="checkbox"
                        className="check-box-name"
                        onClick={(e) => Func(e, element)}
                      />
                      &nbsp; &nbsp;
                      <label htmlFor="Fulltime" className="label-name mt-2">
                        {element}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-2 mb-4">
              <hr className="horizontal-line" />
            </div>
            <div className="salaryRange-div">
              <div className="typeofEmp-div">
                <div className="typeofEmp-child-div-heading">
                  <h5 className="mb-4">Salary Range</h5>
                  {salaryRange.map((element, index) => {
                    return (
                      <div className="typeofEmp-child-div-label" key={index}>
                        <input
                          type="checkbox"
                          className="check-box-name"
                          onClick={(e) => Func(e, element)}
                        />
                        &nbsp; &nbsp;
                        <label htmlFor="Fulltime" className="label-name mt-2">
                          {element}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
