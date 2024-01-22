import React from "react";
import { Tooltip } from './Tooltip.jsx'

/**
 * Exports a custom cell renderer for the location column of the table view.
 * @param value - the location of the graph on the system
 */
export const CustomLocationCellRenderer = ({ value }) => {
  const Caption = value;

  return (
    <div className="title-cell">
        <div>
          <Tooltip content={Caption}>
            {Caption}
          </Tooltip>
        </div>
    </div>
  );
};
