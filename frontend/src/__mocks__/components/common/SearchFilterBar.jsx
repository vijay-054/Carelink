import React from 'react';

const SearchFilterBar = ({ placeholder, filterOptions, onSearch, onFilter }) => {
    return (
        <div className="search-filter-bar">
            <input
                type="text"
                placeholder={placeholder || 'Search...'}
                onChange={(e) => onSearch && onSearch(e.target.value)}
            />
            {filterOptions && (
                <select onChange={(e) => onFilter && onFilter(e.target.value)}>
                    {filterOptions.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default SearchFilterBar;