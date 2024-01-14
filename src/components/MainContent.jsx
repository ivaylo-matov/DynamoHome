import React from 'react';
import { useState, useEffect } from 'react'
import { RecentPage } from './PageRecent.jsx'
import { SamplesPage } from './PageSamples.jsx'
import { LearningPage } from './PageLearning.jsx'

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