// ================================== Packages Dependencies
import React from "react";

const ProjectCard = function(props) {
  return (
    <div
      className="card bg-secondary projectCard col-md-12 overflow-auto"
      style={{
        fontSize: "14pt"
      }}
      data-id={props.id}
      key={props.id}
      onClick={props.onClick}
    >
      <div className="card-header display-4" data-id={props.id}>
        Project: {props.id} - {props.name}
      </div>
      <div
        className="card-body"
        style={{
          fontSize: "12pt"
        }}
        data-id={props.id}
      >
        <p className="card-title display-5" data-id={props.id}>
          {props.description}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
