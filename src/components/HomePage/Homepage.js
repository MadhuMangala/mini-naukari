import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Homepage.css";

const Homepage = () => {
  return (
    <>
      <div className="Homepage-parent">
        <Navbar />
        <div className="Homepage-children">
          <div className="Homepage-children-text">
            <div className="Homepage-children-text-body">
              <h1 className="job-heading">Find The Job That Fits Your Life</h1>
              <p className="job-description">
                Millions of people are searching for jobs , salary information
                Company reviews. Find the job that fits Your abilities and
                Potential
              </p>
              <div className="mt-4">
                <a href="/Jobs">
                  <button
                    className="btn btn-primary home-item"
                    style={{ backgroundColor: "#6366f1" }}
                  >
                    Find Jobs
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
