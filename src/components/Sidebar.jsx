import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { CustomDropdown } from './CustomDropDown.jsx'

export function Sidebar({ onItemSelect, selectedSidebarItem })
{
    const [selectedFile, setSelectedFile] = useState('');
    const [selectedNew, setSelectedNew] = useState('');

    const isSelected = (item) => selectedSidebarItem === item;

    const setSelectedValue = (value) => {
        if (value === 'open-file' && chrome.webview !== undefined) {
            chrome.webview.hostObjects.scriptObject.OpenWorkspace();
        }
        if(value === 'workspace' && chrome.webview !== undefined){
            chrome.webview.hostObjects.scriptObject.NewWorkspace();
        }
        if(value === 'custom-node' && chrome.webview !== undefined){
            chrome.webview.hostObjects.scriptObject.NewCustomNodeWorkspace();
        }
    };

    return (
        
        <div className='sidebar-container'>
            <div className="sidebar-grid-container">
                <div className="cell">
                    <p className="dynamo-logo">Dynamo</p>
                    {/* Files Dropdown */}
                    <CustomDropdown 
                        selectedValue={selectedFile}
                        onSelect={setSelectedFile}
                        placeholder="Open"
                        onSelectionChange={setSelectedValue}
                        options={[
                            { label: 'Open File', value: 'open-file' },
                            { label: 'Open Template', value: 'open-template' },
                            { label: 'Backup Locations', value: 'open-backup-locations' }
                        ]}
                    />

                    {/* New Dropdown */}
                    <CustomDropdown 
                        selectedValue={selectedNew}
                        onSelect={setSelectedNew}
                        placeholder="New"
                        onSelectionChange={setSelectedValue}
                        options={[
                            { label: 'Workspace', value: 'workspace' },
                            { label: 'Custom Node', value: 'custom-node' }
                        ]}
                    />

                    <div className="sidebar-items-container">
                        <div className={`sidebar-link-container ${isSelected('Recent') ? 'selected' : ''}`} onClick={() => onItemSelect('Recent')}>
                            <p className="sidebar-text">Recent</p>
                        </div>
                        <div className={`sidebar-link-container ${isSelected('Samples') ? 'selected' : ''}`} onClick={() => onItemSelect('Samples')}>
                            <p className="sidebar-text">Samples</p>
                        </div>
                        <div className={`sidebar-link-container ${isSelected('Learning') ? 'selected' : ''}`} onClick={() => onItemSelect('Learning')}>
                            <p className="sidebar-text">Learning</p>
                        </div>
                    </div>
                </div>
                <div className="cell">
                    <hr className="separator"/>
                </div>
                <div className="link-container cell">
                    <a className='sidebar-link' href="https://placeholder.com">Discussion Forum</a>
                    <a className='sidebar-link' href="https://placeholder.com">Dynamo Webside</a>
                    <a className='sidebar-link' href="https://placeholder.com">Dynamo Primer</a>
                    <a className='sidebar-link' href="https://placeholder.com">Dynamo Dictionary</a>
                    <a className='sidebar-link' href="https://placeholder.com">Github Repository</a>
                    <a className='sidebar-link' href="https://placeholder.com">Send Issues</a>
                </div>
            </div>
        </div>
    )
}