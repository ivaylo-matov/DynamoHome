import React from "react";
import { useState, useEffect } from 'react';
import { GraphGridItem } from './GraphGridItem.jsx';
import { CustomNameCellRenderer } from './CustomNameCellRenderer.jsx';
import { CustomLocationCellRenderer } from './CustomLocationCellRenderer.jsx';
import { GraphTable } from './GraphTable.jsx';
import { GridViewIcon, ListViewIcon } from '../Common/CustomIcons.jsx';
import { openFile } from '../../functions/utility.js';
import { FormattedMessage } from 'react-intl';
import { Tooltip } from '../Common/Tooltip.jsx';

export function RecentPage ({ setIsDisabled }){
    const [displayText, setDisplayText] = useState('Test');
    const [viewMode, setViewMode] = useState('grid'); 

    // Set a placeholder for the graphs which will be used differently during dev and prod 
    let initialGraphs = [];
    
    // If we are under development, we will load the graphs from the local asset folder
    if (process.env.NODE_ENV === 'development') {
        initialGraphs = require('../../assets/home.js').graphs;
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
          Cell: CustomNameCellRenderer,
        },
        {
          Header: 'Author',
          accessor: 'Author',
          resizable: true,
        },
        {
          Header: 'Date Modified',
          accessor: 'DateModified',
          resizable: true,
        },
        {
          Header: 'Location',
          accessor: 'ContextData',
          resizable: true,
          Cell: CustomLocationCellRenderer,
        }
      ], []);

    // Handles mouse click over each row
    const handleRowClick = (row) => {
        // freezes the UI   
        setIsDisabled(true);   
        
        const contextData = row.original.ContextData;  
        openFile(contextData);
    };

    return(
        <div>
            <div className='drop-shadow-2xl'>
                <p className='title-paragraph'><FormattedMessage id="title.text.recent"/></p>  
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom:"10px" }}>
                <button 
                    className={`viewmode-button ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    disabled={viewMode === 'grid'}>
                    <Tooltip content={<FormattedMessage id="tooltip.text.grid.view.button" />}>
                            <GridViewIcon/>
                    </Tooltip>
                </button>
                <button 
                    className={`viewmode-button ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                    disabled={viewMode === 'list'}>
                    <Tooltip content={<FormattedMessage id="tooltip.text.list.view.button" />}>
                        <ListViewIcon/>
                    </Tooltip>
                </button>
            </div>
            <div style={{ marginRight: "20px" }}>
                {viewMode === 'list' && (
                    <GraphTable columns={columns} data={graphs} onRowClick={handleRowClick}/>
                )}                
                {viewMode === 'grid' && (
                    <div className="main-graph-grid">
                        {graphs.map(graph => (
                            <GraphGridItem key={graph.id} {...graph} setIsDisabled={setIsDisabled} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}