import React, { useContext, useState } from "react";
import { createContext } from "react";
import Navbar from "../Navbar/Navbar";
import "../JobsModule/JobsModule.css";
import SideNav from "./Sidebar/SideNav";
import JobsCardBody from "./Jobcards/JobsCardBody";
export const ContextSidedata = createContext("");
const ModuleCollector = () => {
  const [FillerData, setFillerData] = useState({
    min_pack: "",
    emp_type: "",
  });

  const FilterApicall = async (element) => {
    console.log("called with filterApil");
    let bool = element.includes("0");
    if (bool) {
      var pack = element.slice(0, 3);
      var addZeros = `${pack}00000`;
      var newaram = addZeros.split(" ").join("");
      setFillerData({
        ...FillerData,
        min_pack: newaram,
      });
    } else {
      let Emp = element;
      setFillerData({
        ...FillerData,
        emp_type: Emp,
      });
    }
  };

  const Modulechange = (event, element) => {
    if (event.target.checked) {
      FilterApicall(element);
    }
  };

  return (
    <>
      <div className="Module-collector">
        <Navbar />
        <div className="sidebarandjobcards mt-4">
          <div className="sidebarandjobcards-child d-flex">
            <div className="sidebar-div shadow-lg">
              <SideNav Func={Modulechange} />
            </div>
            <div className="jobcards-div">
              <ContextSidedata.Provider value={FillerData}>
                <JobsCardBody />
              </ContextSidedata.Provider>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default ModuleCollector;
