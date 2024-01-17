import React from 'react';
import { Tooltip } from '@adsk/uda-ui-components';

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
                <p className="graph-item-subtitle-text graph-card-text-item">
                    <Tooltip tooltipFontWeight='regular' content={tooltip}>
                        {description}
                    </Tooltip>
                </p>
            </div>
        </div>
    );
}