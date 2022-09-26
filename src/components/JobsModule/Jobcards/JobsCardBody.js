import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BsSearch, BsFillBagFill } from "react-icons/bs";
import { RiStarSFill } from "react-icons/ri";
import { GoLocation } from "react-icons/go";
import { ThreeDots } from "react-loader-spinner";
import "../Jobcards/JobsCardBody.css";
import NotFound from "../../NotFound/NotFound";
import { ContextSidedata } from "../ModuleCollector";

const JobsCardBody = () => {
  var jobsData1 = useContext(ContextSidedata);
  const [jobsData, setJobsData] = useState([]);
  const [isLoading, setisData] = useState(true);
  const [Nojobs, setNojobs] = useState(false);
  const [ChangeAct, setChangeAct] = useState("");

  const JobsApi = async (dat) => {
    setisData(true);
    if (dat === "clear") {
      setJobsData("");
      jobsData1 = "";
    }

    await axios({
      method: "GET",
      url: "https://apis.ccbp.in/jobs",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
      },
      params: {
        employment_type: jobsData1.emp_type,
        minimum_package: jobsData1.min_pack,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setJobsData(res.data.jobs);
          setNojobs(false);
          setisData(false);
          setChangeAct("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangefilter = (e) => {
    setChangeAct(e.target.value);
    const DataFilter = jobsData.filter((element, index) => {
      return element.title.includes(e.target.value);
    });
    if (DataFilter.length > 0) {
      setJobsData(DataFilter);
    } else {
      setNojobs(true);
    }
  };

  useEffect(() => {
    JobsApi();
  }, [jobsData1]);
  return (
    <>
      <div className="Job-cards-parent">
        <div className="job-cards-childs mb-5">
          <input
            type="text"
            className="job-search"
            placeholder="Search"
            value={ChangeAct}
            onChange={handleChangefilter}
          />
          <h1 className="BsSearch" onClick={() => JobsApi("clear")}>
            <BsSearch />
          </h1>
        </div>
        {isLoading ? (
          <div className="spinner-div">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#4fa94d"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
        ) : Nojobs ? (
          <NotFound />
        ) : (
          jobsData.map((element, index) => {
            return (
              <div className="job-cards-childs-cards mt-3 mb-4" key={index}>
                <a href={`/Jobs/${element.id}`} alt="" className="antag">
                  <div className="job-cards-childs-one">
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
                          </h3>{" "}
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
                      <h3 className="mt-2 mb-3">Description</h3>
                      <p className="dis-text mt-2 mb-3">
                        {element.job_description}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default JobsCardBody;
