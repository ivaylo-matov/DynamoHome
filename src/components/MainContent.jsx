import React from 'react';
import { RecentPage } from './Recent/PageRecent.jsx'
import { SamplesPage } from './Samples/PageSamples.jsx'
import { LearningPage } from './Learning/PageLearning.jsx'

export function MainContent({ selectedSidebarItem }){

    return (
        <div className='main-body-container'>
            <div className={`page-container ${selectedSidebarItem === 'Recent' ? '' : 'hidden'}`}>
                <RecentPage />
            </div>
            <div className={`page-container ${selectedSidebarItem === 'Samples' ? '' : 'hidden'}`}>
                <SamplesPage />
            </div>
            <div className={`page-container ${selectedSidebarItem === 'Learning' ? '' : 'hidden'}`}>
                <LearningPage />
            </div>
        </div>
    )
}