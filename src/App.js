import React from 'react';
import { useState, useEffect } from 'react'
import { MainContent } from './components/MainContent.jsx'
import { Sidebar } from './components/Sidebar.jsx'

function App() {
  console.log('starting');

  // State to track the selected sidebar item
  const [selectedSidebarItem, setSelectedSidebarItem] = useState('Recent');

  // Event handler for sidebar item click
  const handleSidebarItemClick = (item) => {
    setSelectedSidebarItem(item);
  }

  useEffect(() => {
      if(chrome.webview !== undefined){
        chrome.webview.hostObjects.scriptObject.ApplicationLoaded();
      }
    }, []); 

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
    );
  }

  export default App
  

 