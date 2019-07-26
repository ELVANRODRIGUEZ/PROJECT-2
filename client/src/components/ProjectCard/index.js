// ================================== Packages Dependencies
import React from "react";

const ProjectCard = function(props) {
  return (
    <div
      className=" card  bg-secondary projectCard col-md-12 overflow-auto"
      data-id={props.id}
      key={props.id}
      onClick={props.onClick}
    >
      <div className="card-header" data-id={props.id}>
        Project: {props.id} - {props.name}
      </div>
      <div className="card-body" data-id={props.id}>
        <h6 className="card-title" data-id={props.id}>
          {props.description}
        </h6>
      </div>
    </div>
  );
};

export default ProjectCard;
