import React from 'react';
import { img } from './../assets/home.js';
import { openFile } from './../functions/utility.js';
import { Tooltip } from '@adsk/uda-ui-components';
import { FormattedMessage } from 'react-intl';

export function GraphGridItem( {id, Caption, ContextData, DateModified} )
{
    const handleClick = (e) => {
        e.preventDefault(); // This prevents the default navigation behavior
        openFile(ContextData);
    };

    return (
    <div className="graph-container">
        <a className="graph-link" onClick={handleClick}>
            <div className="clipped-image-container">
                <img src={img} className="clipped-image"/>
            </div>
            
            <Tooltip tooltipFontWeight='regular' content={ContextData}>
                <div className="custom-container">
                    <p className="graph-item-title-text graph-card-text-item">{Caption}</p>
                    <p className="graph-item-subtitle-text graph-card-text-item">{DateModified}</p>
                </div>
            </Tooltip>
        </a>
    </div>
    )
}