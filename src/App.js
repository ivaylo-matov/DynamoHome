import React from 'react';
import { useState, useEffect } from 'react'
import { GraphGridItem } from './components/GraphGridItem.jsx'
import { GraphTableRow } from './components/GraphTableRow.jsx'
import { Sidebar } from './components/Sidebar.jsx'
import { GridViewIcon, ListViewIcon } from './components/CustomIcons.jsx'
// import { graphs } from './assets/home.js'

function App() {
    const [displayText, setDisplayText] = useState('Test');
    const [graphs, setGraphs] = useState([]);
    const [viewMode, setViewMode] = useState('grid'); 
  
    const setLoadingDone = (newText) => {
      alert('set loading text data');

        setDisplayText(newText);
    };

    const receiveGraphDataFromDotNet = (jsonData) => {
      alert('receiving data');
        console.log('Received data from .NET:', jsonData);
      
        try {
          // jsonData is already an object, so no need to parse it
          const data = jsonData;
          console.log('Received data:', data);
        
          setGraphs(data);
        } catch (error) {
          console.error('Error processing data:', error);
        }
    };

    console.log(graphs);

    useEffect(() => {
        window.setLoadingDone = setLoadingDone;
        window.receiveGraphDataFromDotNet = receiveGraphDataFromDotNet;

        // Cleanup function (optional)
        return () => {
            delete window.setLoadingDone;
            delete window.receiveGraphDataFromDotNet;
        };
    }, []); 

    return (
      <div className='main-container'>
        <div className='main-flex-container'>
          <div className='sidebar-container'>
            <Sidebar/>
          </div>
  
          <div className='main-body-container'>
            <div className='drop-shadow-2xl'>
              <p className='title-paragraph'>Recent</p>  
            </div>
            <div>
              <button title='grid-view-button'
                  className={`viewmode-button ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  disabled={viewMode === 'grid'}
              >
                <GridViewIcon/>
              </button>
              <button title='list-view-button'
                  className={`viewmode-button ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  disabled={viewMode === 'list'}
              >
                <ListViewIcon/>
              </button>
            </div>
            <>
              {viewMode === 'list' && (
                <div className="table-view">
                  <div className="table-header">
                    <div className='graph-item-subtitle-text'>Title</div>
                    <div className='graph-item-subtitle-text'>Author</div>
                    <div className='graph-item-subtitle-text'>Date Modified</div>
                    <div className='graph-item-subtitle-text'>Location</div>
                  </div>
                  {graphs.map(graph => (
                    <GraphTableRow key={graph.id} {...graph} />
                  ))}
                </div>
              )}
              {viewMode === 'grid' && (
                <div className="main-graph-grid">
                  {graphs.map(graph => (
                    <GraphGridItem key={graph.id} {...graph} />
                  ))}
                </div>
              )}
            </>
          </div>
        </div>
      </div>
    );
  }
  
 

  export default App
  

  // return (
  //   <div className='main-container'>
  //     <div className='main-flex-container'>

  //       {/* Sidebar */}
  //       <Sidebar 
  //         onItemSelect={handleSidebarItemClick}
  //         selectedSidebarItem={selectedSidebarItem}
  //       />
  //       {/* Main Body */}
  //       <MainContent selectedSidebarItem={selectedSidebarItem}/>

  //     </div>
  //   </div>
  // );