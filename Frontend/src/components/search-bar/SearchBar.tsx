import React from 'react';
import { ISearchBarProps } from '../../interfaces';
import './SearchBar.css';

/**
 * SearchBar Component
 *
 * A controlled input field for searching GitHub users.
 *
 * Props:
 * - `query` (string): Current search term (controlled value).
 * - `onQueryChange` (function): Callback triggered when the input value changes
 *   or when the Escape key is pressed (clears the search).
 *
 * Features:
 * - Accessibility: Uses `role="search"` and `aria-label` for screen readers.
 * - Keyboard support: Pressing Escape clears the input.
 * - Optimized with `React.memo` to prevent unnecessary re-renders.
 */

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
