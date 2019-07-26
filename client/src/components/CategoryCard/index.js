// ================================== Packages Dependencies
import React from "react";

const CategoryCard = function(props) {
  return (
    <div
      className="card  bg-secondary categoryCard col-md-12 overflow-auto"
      key={props.id}
      data-id={props.id}
    >
      <div className="card-header" data-id={props.id}>
        <div>
          <i className="fa fa-paste"></i>
          &nbsp;(tasks)&nbsp;x&nbsp;&nbsp;{props.count}
        </div>
        Category: {props.id}-{props.name}
      </div>
      <div className="card-body" data-id={props.id}>
        <h6 className="card-title" data-id={props.id}>
          {props.description}
        </h6>
      </div>
    </div>
  );
};

export default CategoryCard;
