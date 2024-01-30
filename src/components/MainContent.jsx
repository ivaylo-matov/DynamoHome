import React, { useState, useEffect } from 'react';
import { RecentPage } from './Recent/PageRecent.jsx';
import { SamplesPage } from './Samples/PageSamples.jsx';
import { LearningPage } from './Learning/PageLearning.jsx';
import { FormattedMessage } from 'react-intl';

export function MainContent({ selectedSidebarItem }){
    const [isDisabled, setIsDisabled] = useState(false);

    const setShowStartPageChanged = (showStartPage) => {
        setIsDisabled(!showStartPage);
    };

    useEffect(() => {
        // Set the setShowStartPageChanged global function
        window.setShowStartPageChanged = setShowStartPageChanged;

        return () => {
            delete window.setShowStartPageChanged;
        };
    }, [isDisabled]); 

    return (
        <>
            <div className={`main-body-container`}>
                {isDisabled && (
                    <div className="loading-overlay">
                        <div className="spinner"></div>
                        <div className="loading-text"><FormattedMessage id="main.page.loading.text" /></div>
                    </div>
                )}
                
                <div className={`page-container ${selectedSidebarItem === 'Recent' ? '' : 'hidden'}`}>
                    <RecentPage setIsDisabled={setIsDisabled} />
                </div>
                <div className={`page-container ${selectedSidebarItem === 'Samples' ? '' : 'hidden'}`}>
                    <SamplesPage />
                </div>
                <div className={`page-container ${selectedSidebarItem === 'Learning' ? '' : 'hidden'}`}>
                    <LearningPage />
                </div>
            </div>
        </>
    )
}