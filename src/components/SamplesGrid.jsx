import React, { useState } from "react";
import { useTable, useFlexLayout, useResizeColumns } from "react-table";
import { SamplesGridItem } from "./SamplesGridItem";


const renderSample = (sample, key) => {
    if (sample.Children && sample.Children.length > 0) {
        // Separate the children into leaf nodes and nested nodes
        const leafNodes = sample.Children.filter(child => !child.Children || child.Children.length === 0);
        const nestedNodes = sample.Children.filter(child => child.Children && child.Children.length > 0);

        return (
            <div key={key} className="sample-container">
                <div className='drop-shadow-2xl'>
                    <p className='title-paragraph'>{sample.FileName}</p>
                </div>
                <div className="graphs-grid">
                    {leafNodes.map((child, index) => (
                        <SamplesGridItem key={child.FileName || index} FileName={child.FileName} FilePath={child.FilePath} />
                    ))}
                </div>
                {nestedNodes.map((nested, nestedIndex) => renderSample(nested, nested.FileName || nestedIndex))}
            </div>
        );
    } else {
        // Render a SamplesGridItem for leaf nodes
        return (
            <SamplesGridItem key={key} FileName={sample.FileName} FilePath={sample.FilePath} />
        );
    }
};

export const SamplesGrid = ({ data }) => {
    const rootChildren = data[0]?.Children || [];
    return (
        <div>
            {rootChildren.map((sample, index) => renderSample(sample, sample.FileName || index))}
        </div>
    );
};