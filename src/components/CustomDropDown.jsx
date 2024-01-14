import React, { useState, useRef, useEffect } from 'react';

export const CustomDropdown = ({ selectedValue, options, onSelect, placeholder, onSelectionChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleOptionSelect = (option) => {
        onSelect(option.label);
        setIsOpen(false);

        if (onSelectionChange) {
            // Call the passed function with the selected value
            onSelectionChange(option.value); 
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className={`custom-dropdown ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
            <div className="dropdown-selected" onClick={toggleDropdown}>
                <span>{selectedValue || placeholder}</span>
                {/* SVG Arrow */}
                <svg className={`arrow ${isOpen ? 'open' : ''}`} width="24" height="24" viewBox="0 0 24 24">
                    <path d="M8 10l4 4 4-4" stroke="#949494" strokeWidth="2" fill="none"/>
                </svg>
            </div>
            <div className={`dropdown-options ${isOpen ? 'open' : ''}`}>
                {options.map((option, index) => (
                    <div key={index} className="dropdown-option" onClick={() => handleOptionSelect(option)}>
                        {option.label}
                    </div>
                ))}
            </div>
        </div>
    );
};