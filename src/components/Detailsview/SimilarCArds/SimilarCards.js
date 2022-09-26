import React, { useContext } from "react";
import "../SimilarCArds/SimilarCard.css";
import "../DetailsView";
import { RiStarSFill } from "react-icons/ri";

import { GoLocation } from "react-icons/go";
import { BsBagCheck } from "react-icons/bs";
import { contextPass } from "../DetailsView";

const SimilarCards = () => {
  const similadetails = useContext(contextPass);
  console.log("SimilarJobsApidata", similadetails);
  return (
    <div>
      <h2>Similar Jobs</h2>
      <div className="similarcard d-flex">
        {similadetails.map((element, index) => {
          return (
            <div className="similar-jobs-div">
              <div className="similar-jobs-child" key={index}>
                <div className="Logo-ratings d-flex  mt-3 mb-4">
                  <div className="logo-image">
                    <img
                      src={element.company_logo_url}
                      alt=""
                      className="logimage"
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </div>
                  <div className="skills-ratings">
                    <h4>{element.title}</h4>
                    <div className="d-flex">
                      <h3 className="don">
                        <RiStarSFill />
                      </h3>
                      &nbsp; &nbsp;
                      <h3>{element.rating}</h3>
                    </div>
                  </div>
                </div>
                <div className="similar-description mt-4 mb-5">
                  <h4 className="mt-4 mb-3">Description</h4>
                  <p className="similar-text mt-3">{element.job_description}</p>
                </div>
                <div className="footer-div-card d-flex mt-4 mb-3">
                  <div className="Location-card-icons d-flex">
                    <h4>
                      <GoLocation />
                    </h4>
                    &nbsp; &nbsp;
                    <p>{element.location}</p>
                  </div>
                  &nbsp; &nbsp; &nbsp;
                  <div className="Location-card-icons d-flex">
                    <h4>
                      <BsBagCheck />
                    </h4>
                    &nbsp; &nbsp;
                    <p>{element.employment_type}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SimilarCards;
