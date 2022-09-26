import React, { useContext } from "react";
import "./skills.css";
import { contextPass } from "../DetailsView";

const Skills = () => {
  const SkillDetailsData = useContext(contextPass);
  console.log(SkillDetailsData, "skillsDetailsData");

  return (
    <div>
      <div className="skills-cards">
        <h2>Skills</h2>
        <div className="skills">
          {SkillDetailsData.map((element, index) => {
            return (
              <div className="card-one-skills" key={index}>
                <div className="skills-image">
                  <img src={element.image_url} alt="" className="w-100" />
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                <div className="skills-text">
                  <h3>{element.name}</h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className="Life-at-componay mt-4 mb-4">
          <h2>Lift at Company</h2>
          {/* {company_life.map((element, index) => {
            return (
              <div className="Lift-text-img-div d-flex mt-4" key={index}>
                <div className="life-text">
                  <p className="text-life-para">{element.description}</p>
                </div>
                <div className="image-div">
                  <img
                    src={`${element.image_url}`}
                    alt=""
                    className="w-100 h-100"
                  />
                </div>
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default Skills;
