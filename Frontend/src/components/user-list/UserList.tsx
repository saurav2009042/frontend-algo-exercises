import React, { useCallback } from 'react';
import { IUserListProps } from '../../interfaces';
import UserCard from '../user-card';
import './UserList.css';

/**
 * UserList Component
 *
 * Displays a list of GitHub users using UserCard components.
 * Supports selection in edit mode and highlights selected users.
 *
 * Props:
 * - `users` (array): List of GitHub user objects.
 * - `selectedIds` (Set<number>): IDs of currently selected users.
 * - `toggleSelect` (function): Callback to select/deselect a user.
 * - `editMode` (boolean): Whether selection checkboxes are visible.
 *
 * Features:
 * - Handles empty state with a friendly message.
 * - Uses `React.memo` and `useCallback` for performance optimization.
 */

const UserList: React.FC<IUserListProps> = ({ users, selectedIds, toggleSelect, editMode }) => {
    const handleToggle = useCallback(
        (id: number) => {
            toggleSelect(id);
        },
        [toggleSelect]
    );

    if (users.length === 0) {
        return (
            <p style={{ textAlign: 'center', marginTop: '20px' }}>
                No results. Try a different search.
            </p>
        );
    }

    return (
        <div className='user-list' role='list'>
            {users.map((user) => (
                <div key={user.id} role='listitem'>
                    <UserCard
                        user={user}
                        selected={selectedIds.has(user.id)}
                        onToggle={() => handleToggle(user.id)}
                        editMode={editMode}
                    />
                </div>
            ))}
        </div>
    );
};

export default React.memo(UserList);
