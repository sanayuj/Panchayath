import React, { useEffect, useState } from "react";
import "./ProjectDisplay.css";
import { getAllProjects } from "../../../Services/userApi";
import { Link } from "react-router-dom";

function ProjectDisplay() {
  const [project, setProject] = useState([]);
  useEffect(() => {
    getAllProjects().then((res) => {
      console.log(res.data.data);
      setProject(res.data.data);
    });
  }, []);
  return (
    <div>
      <h4 className="m-4 ">Panchayath's Projects</h4>
      <div
        className="accordion container-fluid accordionMainDiv"
        id="accordionPanelsStayOpenExample"
      >
        {project.map((value) => (
          <div className="accordion-item myAccordion">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne"
              >
                {value.projectName}
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseOne"
              className="accordion-collapse collapse show"
            >
             <span className="projectDate"><strong>Date : </strong>{value.Date}</span> 
             <div className="accordion-body">
          <div className="descriptionDiv">
            <div className="projectImg"><img className="Pimage" src={`http://localhost:4000/Img/${value.projectImage}`}/></div>
<div className="projectDesc">  {value.projectDescription}</div>

          </div>
          <div className="website">Website : <Link>{value.website}</Link></div>
           
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectDisplay;
