import React from 'react';
import { ISearchBarProps } from '../../interfaces';
import './SearchBar.css';

const SearchBar: React.FC<ISearchBarProps> = ({ query, onQueryChange }) => {
    return (
        <div className='search-bar' role='search'>
            <input
                type='text'
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder='Search GitHub Users...'
                className='search-input'
                aria-label='Search GitHub Users'
                onKeyDown={(e) => e.key === 'Escape' && onQueryChange('')}
            />
        </div>
    );
};

export default React.memo(SearchBar);
