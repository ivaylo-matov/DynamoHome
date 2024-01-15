import React from "react";
import { img } from './../assets/home.js'

/**
 * Exports a custom cell renderer for the first column of the table view.
 * @param value - the name of the graph
 * @param row - the data associate with this row containing all the information for the graph
 */
export const CustomCellRenderer = ({ value, row }) => {
  const imgSrc = row.original.thumbnail || img;
  const Caption = value;

  return (
    <div className="title-cell">
      <a className="graph-link row-img">
        <div className="clipped-image-container row-img-container">
          <img src={imgSrc} className="clipped-image" />
        </div>
      </a>
      <div className="row-item-text title-text">{Caption}</div>
    </div>
  );
};
