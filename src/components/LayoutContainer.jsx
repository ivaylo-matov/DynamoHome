import React, { useState, useEffect } from 'react';
import { MainContent } from './MainContent.jsx';
import { Sidebar } from './Sidebar/Sidebar.jsx';
import SplitPane from 'react-split-pane';

export function LayoutContainer(){
    // State to track the selected sidebar item
    const sideBarWidth = 300;
    const [selectedSidebarItem, setSelectedSidebarItem] = useState('Recent');

    // Event handler for sidebar item click
    const handleSidebarItemClick = (item) => {
        setSelectedSidebarItem(item);
    }
    
    return (
        <div className='main-container'>
          <div className='main-flex-container'>

            <SplitPane 
              className='split-pane'
              split="vertical"
              minSize={50}
              maxSize={600}
              defaultSize={sideBarWidth}>

              {/* Sidebar */}
              <Sidebar 
                onItemSelect={handleSidebarItemClick}
                selectedSidebarItem={selectedSidebarItem}
              />
              
              {/* Main Body */}
              <MainContent selectedSidebarItem={selectedSidebarItem}/>
              
            </SplitPane>
          </div>
        </div>
    )
}
