import React from 'react';
import { img } from '../../assets/home.js';
import { openFile } from '../../functions/utility.js';
import { CardItem } from '../Common/CardItem.jsx';

export function GraphGridItem({ id, Caption, ContextData, DateModified }) {
    const handleClick = (e) => {
        e.preventDefault();
        openFile(ContextData);
    };

    return (
        <CardItem 
            imageSrc={img} 
            onClick={handleClick} 
            tooltipContent={ContextData} 
            titleText={Caption} 
            subtitleText={DateModified} 
        />
    );
}