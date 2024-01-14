import React from 'react';
import { useState, useEffect } from 'react'
import { RecentPage } from './PageRecent.jsx'
import { SamplesPage } from './PageSamples.jsx'
import { LearningPage } from './PageLearning.jsx'

export function MainContent({ selectedSidebarItem }){

    return (
        <div className='main-body-container'>
            {selectedSidebarItem === 'Recent' && (
                <RecentPage />
            )}
            {selectedSidebarItem === 'Samples' && (
                <SamplesPage />
            )}
            {selectedSidebarItem === 'Learning' && (
                <LearningPage />
            )}
        </div>
    )
}