import React from 'react';
import { Tooltip } from './Tooltip.jsx'

export function VideoCarouselItem({ id, title, videoId, description }) {
    const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}`;
    const tooltip = <div>
        <strong>
            {title}
        </strong>
        <br/>
        <br/>
        {description}
    </div>


    return (
        <div className="video-container">
            <div className="clipped-video-container">
                {/* Embed YouTube Video */}
                <iframe 
                    src={youtubeEmbedUrl} 
                    className="clipped-video"
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                </iframe>
            </div>
            <div className="custom-video-container">
                <p className="graph-item-title-text graph-card-text-item">{title}</p>
                <Tooltip verticalOffset={20} content={tooltip}>
                    <p className="graph-item-subtitle-text graph-card-text-item">
                        {description}
                    </p>
                </Tooltip>
            </div>
        </div>
    );
}