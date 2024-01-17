import React, { useState } from 'react';

export const Carousel = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 4;
    const totalItems = React.Children.count(children);
    const maxIndex = totalItems - itemsPerPage

    const goLeft = () => {
        setCurrentIndex(currentIndex === 0 ? maxIndex : currentIndex - 1);
    };

    const goRight = () => {
        setCurrentIndex(currentIndex === maxIndex ? 0 : currentIndex + 1);
    }

    return (
        <div className="carousel-container">
            <button onClick={goLeft}>
                <svg className="arrow left" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M8 10l4 4 4-4" stroke="#949494" strokeWidth="2" fill="none"/>
                </svg>
            </button>
            <div className="carousel-content-wrapper">
                <div className="carousel-content" style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}>
                    {children}
                </div>
            </div>
            <button onClick={goRight}>
                <svg className="arrow right" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M8 10l4 4 4-4" stroke="#949494" strokeWidth="2" fill="none"/>
                </svg>
            </button>
        </div>
    );
};