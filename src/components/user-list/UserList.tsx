import React, { useCallback } from 'react';
import { IUserListProps } from '../../interfaces';
import UserCard from '../user-card';
import './UserList.css';

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
