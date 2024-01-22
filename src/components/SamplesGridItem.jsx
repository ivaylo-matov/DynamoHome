import React from 'react';
import { img } from './../assets/home.js';
import { openFile } from './../functions/utility.js';
import { Tooltip } from './Tooltip.jsx'

export function SamplesGridItem({ FileName, FilePath }) {
    // Omitting Description and id as they are not available in the new data

    const handleClick = (e) => {
        e.preventDefault(); // This prevents the default navigation behavior
        openFile(FilePath); // Adjust as needed
    };

    return (
        <div className="graph-container">
            <a className="graph-link" onClick={handleClick}>
                <div className="clipped-image-container">
                    <img src={img} className="clipped-image"/>
                </div>
                
                <Tooltip content={FilePath}>
                    <div className="custom-container">
                        <p className="graph-item-title-text graph-card-text-item">{FileName}</p>
                        <p className="graph-item-subtitle-text graph-card-text-item">{FilePath}</p>
                    </div>
                </Tooltip>
            </a>
        </div>
    )
}