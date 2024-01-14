import React from "react";
import { useState, useEffect } from 'react'
import { GraphGridItem } from './GraphGridItem.jsx'
import { GraphTableRow } from './GraphTableRow.jsx'
import { GridViewIcon, ListViewIcon } from './CustomIcons.jsx'

export function RecentPage (){
    const [displayText, setDisplayText] = useState('Test');
    const [viewMode, setViewMode] = useState('grid'); 

    // Set a placeholder for the graphs which will be used differently during dev and prod 
    let initialGraphs = [];
    
    // If we are under development, we will load the graphs from the local asset folder
    if (process.env.NODE_ENV === 'development') {
        initialGraphs = require('../assets/home.js').graphs;
    }

    const [graphs, setGraphs] = useState(initialGraphs);    

    const setLoadingDone = (newText) => {
        alert('loading done');
        alert(newText);
        setDisplayText(newText);
    };

    const receiveGraphDataFromDotNet = (jsonData) => {
        alert('nothing');
        console.log('Received data from .NET:', jsonData);
        alert('Received data from .NET:', jsonData);
      
        try {
          // jsonData is already an object, so no need to parse it
          const data = jsonData;
          console.log('Received data:', data);
        
          setGraphs(data);
        } catch (error) {
          console.error('Error processing data:', error);
        }
    };

    useEffect(() => {
        window.setLoadingDone = setLoadingDone;
        // If we are under production, we will override the graphs with the actual data sent from Dynamo
        if (process.env.NODE_ENV !== 'development') {
            alert('setting shit');
            window.receiveGraphDataFromDotNet = receiveGraphDataFromDotNet;
        }

        // Cleanup function (optional)
        return () => {
            delete window.setLoadingDone;
            if (process.env.NODE_ENV !== 'development') {
                delete window.receiveGraphDataFromDotNet;
            }
        };
    }, []); 

    alert(process.env.NODE_ENV);
    console.log(process.env.NODE_ENV);
    console.log(graphs);

    return(
        <div>
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
            <div>
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
            </div>
        </div>
    )
}