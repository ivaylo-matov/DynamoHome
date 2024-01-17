import React from "react";
import { Tooltip } from '@adsk/uda-ui-components';

/**
 * Exports a custom cell renderer for the location column of the table view.
 * @param value - the location of the graph on the system
 */
export const CustomLocationCellRenderer = ({ value }) => {
  const Caption = value;

  return (
    <div className="title-cell">
        <div className="row-item-text title-text">
          <Tooltip tooltipFontWeight='regular' tooltipMaxWidth={400} content={Caption}>
            {Caption}
          </Tooltip>
        </div>
    </div>
  );
};
