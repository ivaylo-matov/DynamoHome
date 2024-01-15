import React from "react";
import { useState, useEffect } from 'react'
import { GraphGridItem } from './GraphGridItem.jsx'
import { CustomCellRenderer } from './CustomCellRenderer.jsx'
import { GraphTable } from './GraphTable.jsx'
import { GridViewIcon, ListViewIcon } from './CustomIcons.jsx'
import { openFile } from './../functions/utility.js'

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

    // To be removed, just for texting purposes
    const setLoadingDone = (newText) => {
        setDisplayText(newText);
    };

    // A method exposed to the backend used to set the graph data coming from Dynamo
    const receiveGraphDataFromDotNet = (jsonData) => {
        console.log('Received data from .NET:', jsonData);
      
        try {
          // jsonData is already an object, so no need to parse it
          const data = jsonData;
          setGraphs(data);
        } catch (error) {
          console.error('Error processing data:', error);
        }
    };

    useEffect(() => {
        window.setLoadingDone = setLoadingDone;
        // If we are under production, we will override the graphs with the actual data sent from Dynamo
        if (process.env.NODE_ENV !== 'development') {
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

    // This variable defins the table structure displaying the graphs
    const columns = React.useMemo(() => [
        {
          Header: 'Title',
          accessor: 'Caption',
          width: 300,
          resizable: true, 
          Cell: CustomCellRenderer,
        },
        {
          Header: 'Author',
          accessor: 'author',
          resizable: true,
        },
        {
          Header: 'Date Modified',
          accessor: 'DateModified',
          resizable: true,
        },
        {
          Header: 'Location',
          accessor: 'Location',
          resizable: true,
        }
      ], []);

    // Handles mouse click over each row
    const handleRowClick = (row) => {
        const contextData = row.original.ContextData;        
        openFile(contextData);
    };

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
                    <GraphTable columns={columns} data={graphs} onRowClick={handleRowClick}/>
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