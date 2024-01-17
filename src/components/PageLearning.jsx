import React from "react";
import { VideoCarouselItem } from './VideoCarouselItem.jsx';
import { videos } from './../assets/learning.js';
import { Carousel } from "./Carousel.jsx";

export function LearningPage(){
    
    return(
        <div>
            <div className='drop-shadow-2xl'>
                <p className='title-paragraph'>Learning</p>  
            </div>
            <div>
                <div className='drop-shadow-2xl'>
                    <p className='title-paragraph'>Video Tutorials</p>  
                </div>
                <Carousel>
                    {videos.map(video => (
                        <div className="video-container" key={video.id}>
                            <VideoCarouselItem {...video} />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}