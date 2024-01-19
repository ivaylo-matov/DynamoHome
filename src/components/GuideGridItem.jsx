import React from 'react';
import { img } from '../assets/home.js';
import { startGuidedTour } from '../functions/utility.js';
import { Tooltip } from './Tooltip.jsx'

export function GuideGridItem ( {id, Name, Description, Type} )
{
    const triggerStartGuidedTourCommand = () => {
        startGuidedTour(Type);
    };

    const handleClick = (e) => {
        e.preventDefault(); // This prevents the default navigation behavior
        triggerStartGuidedTourCommand();
    };

    return (
    <div className="graph-container">
        <a className="graph-link" onClick={handleClick}>
            <div className="clipped-image-container">
                <img src={img} className="clipped-image"/>
            </div>
            
            <Tooltip content={Description}>
                <div className="custom-container">
                    <p className="graph-item-title-text graph-card-text-item">{Name}</p>
                    <p className="graph-item-subtitle-text graph-card-text-item">{Description}</p>
                </div>
            </Tooltip>
        </a>
    </div>
    )
}