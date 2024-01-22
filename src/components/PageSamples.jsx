import React from "react";
import { useState, useEffect } from 'react';
import { SamplesTable } from './SamplesTable.jsx';
import { FormattedMessage } from 'react-intl';
import { GraphGridItem } from './GraphGridItem.jsx';
import { GridViewIcon, ListViewIcon } from './CustomIcons.jsx';
import { Tooltip } from './Tooltip.jsx';
import { CustomSampleFirstCellRenderer } from "./CustomSampleFirstCellRenderer.jsx";
import { SamplesGrid } from './SamplesGrid.jsx';
import { openFile } from './../functions/utility.js';

export function SamplesPage (){
    const [viewMode, setViewMode] = useState('grid'); 
    const [collapsedRows, setCollapsedRows] = useState({});

    // Set a placeholder for the graphs which will be used differently during dev and prod 
    let initialSamples = [];
    
    // If we are under development, we will load the graphs from the local asset folder
    if (process.env.NODE_ENV === 'development') {
        initialSamples = require('../assets/samples.js').samples;
    }

    const [samples, setSamples] = useState(initialSamples);    

    // A method exposed to the backend used to set the samples data coming from Dynamo
    const receiveSamplesDataFromDotNet = (jsonData) => {
        console.log('Received data from .NET:', jsonData);
      
        try {
          // jsonData is already an object, so no need to parse it
          const data = jsonData;
          setSamples(data);
        } catch (error) {
          console.error('Error processing data:', error);
        }
    };

    const handleCollapsedRowsChange = (newCollapsedRows) => {
        setCollapsedRows(newCollapsedRows);
      };

    useEffect(() => {
        // If we are under production, we will override the graphs with the actual data sent from Dynamo
        if (process.env.NODE_ENV !== 'development') {
            window.receiveSamplesDataFromDotNet = receiveSamplesDataFromDotNet;
        }

        // Cleanup function (optional)
        return () => {
            delete window.setLoadingDone;
            if (process.env.NODE_ENV !== 'development') {
                delete window.receiveSamplesDataFromDotNet;
            }
        };
    }, []); 

    // This variable defins the table structure displaying the graphs
    const columns = React.useMemo(() => [
        {
          Header: 'Title',
          accessor: 'FileName',
          width: 120,
          resizable: true,
          Cell: ({ cell, row, rows, rowIndex }) => 
          CustomSampleFirstCellRenderer({
            ...cell, 
            row, 
            rows, 
            rowIndex: row.index, 
            collapsedRows
          })
        },
        {
          Header: 'Description',
          accessor: 'FilePath',
          resizable: true,
        }
      ], [collapsedRows]);

    // Handles mouse click over each row
    const handleRowClick = (row) => {
        openFile(row.FilePath);
    };

    return(
        <div>
            <div className='drop-shadow-2xl'>
                <p className='title-paragraph'><FormattedMessage id="title.text.samples"/></p>  
            </div>
            <div>
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
            <div>
                {viewMode === 'list' && (
                    <SamplesTable columns={columns} data={samples} onRowClick={handleRowClick} onCollapsedRowsChange={handleCollapsedRowsChange}/>
                )}                
                {viewMode === 'grid' && (                    
                    <SamplesGrid data={samples}/>
                )}
            </div>
        </div>
    )
}