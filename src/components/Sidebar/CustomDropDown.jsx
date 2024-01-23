import React, { useState, useRef, useEffect } from 'react';
import styles from './CustomDropDown.module.css';
import { OpenArrow } from '../Common/Arrow';

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
        <div className={`${styles['custom-dropdown']} ${isOpen ? styles.open : ''}`} ref={dropdownRef}>
            <div className={styles['dropdown-selected']} onClick={toggleDropdown}>
                <span>{placeholder}</span>
                {/* SVG Arrow */}
                <OpenArrow isOpen={isOpen} />
            </div>
            <div className={`${styles['dropdown-options']} ${isOpen ? styles.open : ''}`}>
                {options.map((option, index) => (
                    <div key={index} className={styles['dropdown-option']} onClick={() => handleOptionSelect(option)}>
                        {option.label}
                    </div>
                ))}
            </div>
        </div>
    );
};