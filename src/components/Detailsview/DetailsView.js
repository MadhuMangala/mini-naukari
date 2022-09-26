import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./DetailsView.css";
import "../JobsModule/Jobcards/JobsCardBody.css";
import { BsFillBagFill, BsFileEarmarkSpreadsheet } from "react-icons/bs";
import { RiStarSFill } from "react-icons/ri";
import { GoLocation } from "react-icons/go";
import Skills from "./Skills/Skills";
import SimilarCards from "./SimilarCArds/SimilarCards";
import { useParams } from "react-router-dom";

export const contextPass = createContext("");
const DetailsView = () => {
  const { id } = useParams();
  const [DetailsData, setDetailsData] = useState([]);
  const [SkillDetailsData, setSkillsDetailsData] = useState([]);
  const [similadetails, setsimilaDetails] = useState([]);
  const DetailsApi = async () => {
    if (id !== "") {
      await axios({
        method: "GET",
        url: `https://apis.ccbp.in/jobs/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            setDetailsData([res.data.job_details]);
            setSkillsDetailsData(res.data.job_details.skills);
            setsimilaDetails(res.data.similar_jobs);
          }
        })
        .catch((error) => {
          console.log(error, "Details view Error");
        });
    }
  };

  useEffect(() => {
    DetailsApi();
  }, []);
  return (
    <>
      <div className="parent-to-all">
        <div>
          <Navbar />
        </div>
        <div className="details-view-parent mt-5 ">
          <div className="detail-view-child">
            {DetailsData.map((element, index) => {
              return (
                <div className="job-cards-childs-one" key={index}>
                  <div className="jobs-cards-top-section d-flex mt-4">
                    <div className="job-card-profile">
                      <img
                        src={element.company_logo_url}
                        alt=""
                        className="w-100"
                      />
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <div className="job-card-text">
                      <h4 className="job-heading-text">{element.title}</h4>

                      <div className="ratings d-flex">
                        <h3 className="don">
                          <RiStarSFill />
                        </h3>
                        &nbsp;&nbsp;
                        <h3>{element.rating}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="jobs-location-type mt-4 mb-2">
                    <div className="job-location-items d-flex">
                      <div className="Location d-flex">
                        <h3>
                          <GoLocation />
                        </h3>
                        &nbsp;&nbsp;&nbsp;
                        <span className="Location-place">
                          {element.location}
                        </span>
                      </div>{" "}
                      &nbsp; &nbsp; &nbsp; &nbsp;
                      <div className="Location d-flex">
                        <h3>
                          <BsFillBagFill />
                        </h3>{" "}
                        &nbsp;&nbsp;&nbsp;
                        <span className="Location-place">
                          {element.employment_type}
                        </span>
                      </div>
                    </div>
                    <div className="package">
                      <h3>{element.package_per_annum}</h3>
                    </div>
                  </div>
                  <div className="horizontal-line mt-4">
                    {/* <hr className="horizontal-line" /> */}
                  </div>
                  <div className="dis-section mt-3">
                    <div className="d-flex justify-content-between">
                      <h3 className="mt-2 mb-3">Description</h3>
                      <div
                        className="d-flex mt-3 mb-3"
                        style={{ color: "blue" }}
                      >
                        <a href={`${element.company_website_url}`} alt="">
                          <h3>Visit</h3>
                        </a>
                        &nbsp;&nbsp;
                        <h3>
                          <BsFileEarmarkSpreadsheet />
                        </h3>
                      </div>
                    </div>
                    <p className="dis-text mt-2 mb-3">
                      {element.job_description}
                    </p>
                  </div>
                </div>
              );
            })}
            <div className="skill-div mt-5 mb-4">
              <div className="skill-div-child">
                <contextPass.Provider value={SkillDetailsData}>
                  <Skills />
                </contextPass.Provider>
              </div>
            </div>
          </div>
        </div>
        <div className="details-view-parent1 mt-5">
          <div className="detail-view-child1">
            <contextPass.Provider value={similadetails}>
              <SimilarCards />
            </contextPass.Provider>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsView;
