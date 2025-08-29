import React, { JSX, memo, useEffect, useRef } from 'react';
import { FaCopy, FaTrash } from 'react-icons/fa';
import { IToolbarProps } from '../../interfaces';
import './Toolbar.css';

/**
 * Toolbar Component
 *
 * A reusable toolbar for entering / exiting Edit Mode, 
 * for managing a list of items such as selecting them all or a few,
 * duplicating, and deleting them.
 *
 * Props:
 * - `allSelected` (boolean): Whether all items are currently selected.
 * - `toggleAll` (function): Toggles select-all checkbox state.
 * - `selectedCount` (number): Number of currently selected items.
 * - `onDelete` (function): Callback to delete selected items.
 * - `onDuplicate` (function): Callback to duplicate selected items.
 * - `editMode` (boolean): Whether edit mode is active.
 * - `toggleEdit` (function): Toggles edit mode on/off.
 * - `totalCount` (number): Total number of items available.
 *
 * Features:
 * - Accessible `role="toolbar"` with ARIA attributes for screen readers.
 * - "Indeterminate" state on the select-all checkbox when only some items are selected.
 * - Keyboard and screen reader-friendly with `aria-pressed` and `aria-checked`.
 * - Uses `React.memo` to prevent unnecessary re-renders.
 */

const Toolbar: React.FC<IToolbarProps> = ({
    allSelected,
    toggleAll,
    selectedCount,
    onDelete,
    onDuplicate,
    editMode,
    toggleEdit,
    totalCount,
}) => {
    const selectAllRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (selectAllRef.current) {
            // Enables the "indeterminate" state for the checkbox
            selectAllRef.current.indeterminate = selectedCount > 0 && selectedCount < totalCount;
        }
    }, [selectedCount, totalCount]);

    return (
        <div
          className='toolbar-container'
          role='toolbar'
          aria-label='User actions toolbar'
        >
            <div className='edit-line'>
                <button
                  className='edit-toggle'
                  onClick={toggleEdit}
                  aria-pressed={editMode}
                >
                    {editMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
                </button>
            </div>

            {/* Actions available only in edit mode */}
            {editMode && (
                <div className='action-line'>
                    <label className='select-info'>
                        <input
                            type='checkbox'
                            ref={selectAllRef}
                            checked={allSelected}
                            onChange={toggleAll}
                            disabled={totalCount === 0}
                            aria-disabled={totalCount === 0}
                            aria-checked={selectedCount > 0 && selectedCount < totalCount ? 'mixed' : allSelected}
                        />
                        <span className='selected-count'>
                            {selectedCount} element{selectedCount !== 1 ? 's' : ''} selected
                        </span>
                    </label>

                    <div className='toolbar-actions'>
                        <button
                          onClick={onDuplicate}
                          disabled={selectedCount === 0}
                          aria-disabled={selectedCount === 0}
                          aria-label='Duplicate'
                        >
                            {FaCopy({}) as JSX.Element}
                        </button>
                        <button
                          onClick={onDelete}
                          disabled={selectedCount === 0}
                          aria-disabled={selectedCount === 0}
                          aria-label='Delete'
                        >
                            {FaTrash({}) as JSX.Element}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default memo(Toolbar);
