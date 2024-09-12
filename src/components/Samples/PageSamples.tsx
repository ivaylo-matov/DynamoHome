import React from "react";
import { useState, useEffect } from 'react';
import { SamplesTable } from './SamplesTable';
import { FormattedMessage } from 'react-intl';
import { GridViewIcon, ListViewIcon } from '../Common/CustomIcons';
import { Tooltip } from '../Common/Tooltip';
import { CustomSampleFirstCellRenderer } from "./CustomSampleFirstCellRenderer";
import { SamplesGrid } from './SamplesGrid';
import { openFile, showSamplesCommand, saveHomePageSettings } from '../../functions/utility';
import { useSettings } from '../SettingsContext';
import { CustomDropdown } from '../Sidebar/CustomDropDown';
import styles from './PageSamples.module.css';

export const SamplesPage = ({ samplesViewMode }) => {
    const { settings, updateSettings } = useSettings();
    const [viewMode, setViewMode] = useState(samplesViewMode); 
    const [collapsedRows, setCollapsedRows] = useState<CollapsedRow>({});
    const [initialized, setInitialized] = useState<boolean>(false);

    // Set a placeholder for the graphs which will be used differently during dev and prod 
    let initialSamples = [];
    
    // If we are under development, we will load the graphs from the local asset folder
    if (process.env.NODE_ENV === 'development') {
        initialSamples = require('../../assets/samples').samples;
    }

    const [samples, setSamples] = useState<any>(initialSamples);    

    // A method exposed to the backend used to set the samples data coming from Dynamo
    const receiveSamplesDataFromDotNet = (jsonData: any) => {
        try {
          // jsonData is already an object, so no need to parse it
          const data = jsonData;
          setSamples(data);
        } catch (error) {
          console.error('Error processing data:', error);
        }
    };

    const handleCollapsedRowsChange = (newCollapsedRows: CollapsedRow) => {
        setCollapsedRows(newCollapsedRows);
      };

    useEffect(() => {
        // If we are under production, we will override the graphs with the actual data sent from Dynamo
        if (process.env.NODE_ENV !== 'development') {
            window.receiveSamplesDataFromDotNet = receiveSamplesDataFromDotNet;
        }

        // Cleanup function (optional)
        return () => {
            if (process.env.NODE_ENV !== 'development') {
                delete window.receiveSamplesDataFromDotNet;
            }
        };
    }, []); 

    
    useEffect(() => {
        // Set the viewMode based on the HomePage preferences
        setViewMode(samplesViewMode);
    }, [samplesViewMode]); 

    useEffect(() => {
        if (initialized || samplesViewMode !== viewMode) {
            setInitialized(true);
            updateSettings({ samplesViewMode: viewMode });
            
            // Send settings to Dynamo to save
            saveHomePageSettings({ ...settings, samplesViewMode: viewMode });
        } 
    }, [viewMode]);

    // This variable defines the table structure displaying the graphs
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
    const handleRowClick = (row:Row) => {
        openFile(row.FilePath);
    };

    // Handles show samples link click
    const handleShowSamplesClick = (value: ShowSamplesCommand) => {
        showSamplesCommand(value);
    }

    return (
        <div>
            <div className='drop-shadow-2xl'>
                <p className='title-paragraph'><FormattedMessage id="title.text.samples"/></p>  
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
                <div style={{ marginLeft: "auto", marginRight: "20px", color: "white" }}>
                    <CustomDropdown
                        id="samplesDropdown"
                        placeholder={<FormattedMessage id="samples.showsamples.text" />}
                        onSelectionChange={handleShowSamplesClick}
                        options={[
                            { label: <FormattedMessage id="samples.showsamples.files.text" />, value: 'open-graphs' },
                            { label: <FormattedMessage id="samples.showsamples.datasets.text" />, value: 'open-datasets' }
                        ]}
                        className={styles.wideDropdown}
                        showDivider={false}
                        wholeButtonActionable={true}
                        disableArrowHoverShadow={true}
                    />
                </div>
            </div>
            <div style={{ marginRight: "20px", paddingBottom: "35px" }}>
                {viewMode === 'list' && (
                    <SamplesTable columns={columns} data={samples} onRowClick={handleRowClick} onCollapsedRowsChange={handleCollapsedRowsChange}/>
                )}                
                {viewMode === 'grid' && (  
                    <div style={{ marginBottom: "20px", marginRight: "30px" }}>
                        <SamplesGrid data={samples}/>
                    </div>
                )}
            </div>
        </div>
    )
}