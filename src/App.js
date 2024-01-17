import React from 'react';
import { useState, useEffect } from 'react';
import { MainContent } from './components/MainContent.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import { IntlProvider } from 'react-intl';
import { getMessagesForLocale } from './localization/localization.js';

function App() {
  console.log('starting');

  // State to track the selected sidebar item
  const [selectedSidebarItem, setSelectedSidebarItem] = useState('Recent');
  const [locale, setLocale] = useState('en');

  // Function to get messages based on locale
  const messages = getMessagesForLocale(locale);

  // Event handler for sidebar item click
  const handleSidebarItemClick = (item) => {
    setSelectedSidebarItem(item);
  }

  window.setLocale = (newLocale) => {
    setLocale(newLocale);
  };

  useEffect(() => {
      console.log('loaded exactly 1 time');
      if(chrome.webview !== undefined){
        chrome.webview.hostObjects.scriptObject.ApplicationLoaded();
      }
    }, []); 

     return (
      <IntlProvider locale={locale} messages={messages}>
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
      </IntlProvider>
    );
  }

  export default App
  

 