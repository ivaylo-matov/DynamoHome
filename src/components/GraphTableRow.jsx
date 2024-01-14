import React from "react";
import { img } from './../assets/home.js'

export function GraphTableRow({ id, Caption, ContextData, DateModified, Location }) {
  const handleClick = (e) => {
    e.preventDefault();
    openFile(ContextData);
  };

  return (
    <div className="table-row">
      {/* TItle */}
      <div className="title-cell">
        <a className="graph-link row-img" onClick={handleClick}>
          <div className="clipped-image-container row-img-container">
            <img src={img} className="clipped-image" />
          </div>
        </a>
        <div className="row-item-text title-text">{Caption}</div>
      </div>
      {/* Author */}
      <div className="row-item-text">{'Username'}</div>
      {/* Date Modfied */}
      <div className="row-item-text">{DateModified}</div>
      {/* Location */}
      <div className="row-item-text">{Location}</div>
    </div>
  );
}
