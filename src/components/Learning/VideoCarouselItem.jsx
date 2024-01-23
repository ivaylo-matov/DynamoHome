import React from 'react';
import { Tooltip } from '../Common/Tooltip.jsx'
import styles from './VideoCarouselItem.module.css';

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
        <div className={styles['video-container']}>
            <div className={styles['clipped-video-container']}>
                {/* Embed YouTube Video */}
                <iframe 
                    src={youtubeEmbedUrl} 
                    className={styles['clipped-video']}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                </iframe>
            </div>
            <div className={styles['custom-video-container']}>
                <p className={`${styles['video-item-title-text']} ${styles['video-card-text-item']}`}>{title}</p>
                <Tooltip verticalOffset={20} content={tooltip}>
                    <p className={`${styles['video-item-subtitle-text']} ${styles['video-card-text-item']}`}>
                        {description}
                    </p>
                </Tooltip>
            </div>
        </div>
    );
}