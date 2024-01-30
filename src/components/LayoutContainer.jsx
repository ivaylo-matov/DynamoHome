import React, { useState, useEffect } from 'react';
import { MainContent } from './MainContent.jsx';
import { Sidebar } from './Sidebar/Sidebar.jsx';

export function LayoutContainer(){
    // State to track the selected sidebar item
    const [selectedSidebarItem, setSelectedSidebarItem] = useState('Recent');

    // Event handler for sidebar item click
    const handleSidebarItemClick = (item) => {
        setSelectedSidebarItem(item);
    }
    
    return (
        <div className='main-container'>
          <div className='main-flex-container'>

            {/* Sidebar */}
            <Sidebar 
              onItemSelect={handleSidebarItemClick}
              selectedSidebarItem={selectedSidebarItem}
            />
            
            {/* Main Body */}
            <MainContent selectedSidebarItem={selectedSidebarItem}/>

          </div>
        </div>
    )
}
