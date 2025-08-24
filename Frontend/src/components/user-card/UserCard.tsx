import React from 'react';
import { IUserCardProps } from '../../interfaces';
import './UserCard.css';

const UserCard: React.FC<IUserCardProps> = ({ user, selected, onToggle, editMode }) => {
    return (
        <div className='user-card' tabIndex={0} aria-label={`Github user ${user.login}`}>
            {editMode && (
                <input 
                    type='checkbox'
                    checked={selected}
                    onChange={onToggle}
                    className='user-checkbox'
                    aria-label={`Select user ${user.login}`} 
                />
            )}
            <img 
                src={user.avatar_url} 
                alt={`Avatar of ${user.login}`} 
                className='avatar' 
                onError={(e) => e.currentTarget.src = '/placeholder.png'} 
            />
            <div className='user-info'>
                <strong title={String(user.id)}>ID: {user.id}</strong>
                <strong title={user.login}>{user.login}</strong>
                
                <a 
                    href={user.html_url} 
                    target='_blank' 
                    rel='noreferrer' 
                    className='view-profile-btn'
                    aria-label={`View profile of ${user.login}`}
                    role='button'
                >
                    View Profile
                </a>
            </div>
        </div>
    );
};

export default React.memo(UserCard);
