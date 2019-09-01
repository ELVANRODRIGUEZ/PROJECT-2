// ================================== Packages Dependencies
import React from "react";

const CategoryCard = function(props) {
  return (
    <div
      className="card bg-secondary categoryCard col-md-12 overflow-auto"
      key={props.id}
      data-id={props.id}
      onClick={props.onClick}
      style={{ fontSize: "14pt" }}
    >
      <div
        className="card-header display-4"
        data-id={props.id}
      >
        <div>
          <i className="fa fa-paste"></i>
          &nbsp;(tasks)&nbsp;x&nbsp;&nbsp;{props.count}
        </div>
        Category: {props.id}-{props.name}
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

export default CategoryCard;
