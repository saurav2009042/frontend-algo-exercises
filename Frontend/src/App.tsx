import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import SearchBar from './components/search-bar';
import Toolbar from './components/toolbar';
import UserList from './components/user-list';
import { useDebounce } from './hooks/useDebounce';
import { IGithubUser } from './interfaces/user.interface';
import { fetchGithubUsers } from './services/github';

const App: React.FC = () => {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState<IGithubUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [selected, setSelected] = useState<Set<number>>(new Set());
    const [editMode, setEditMode] = useState(false);

    const controllerRef = useRef<AbortController | null>(null);

    const debouncedQuery = useDebounce(query, 350);

    useEffect(() => {
        if (!debouncedQuery) {
            setUsers([]);
            setSelected(new Set());
            return;
        }

        controllerRef.current?.abort();
        const controller = new AbortController();
        controllerRef.current = controller;

        setLoading(true);
        setError(null);

        fetchGithubUsers(debouncedQuery, controller.signal)
            .then((data) => {
                setUsers(data);
                setSelected(new Set());
            })
            .catch((err) => {
                if (err.message === 'rate_limit') {
                    setError('GitHub API rate limit exceeded. Please wait.');
                } else if (err.name !== 'AbortError') {
                    setError('Something went wrong. Try again.');
                }
            })
            .finally(() => setLoading(false));
    }, [debouncedQuery]);

    const toggleSelect = (id: number) => {
        setSelected((prev) => {
            const copy = new Set(prev);
            copy.has(id) ? copy.delete(id) : copy.add(id);
            return copy;
        });
    };

    const toggleAll = () => {
        if (selected.size === users.length) {
            setSelected(new Set());
        } else {
            setSelected(new Set(users.map((u) => u.id)));
        }
    };

    const onDelete = () => {
        setUsers((prev) => prev.filter((u) => !selected.has(u.id)));
        setSelected(new Set());
    };

    const onDuplicate = () => {
        setUsers((prev) => {
            const newUsers: typeof prev = [];

            prev.forEach((user) => {
                newUsers.push(user);
                if (selected.has(user.id)) {
                    newUsers.push({ ...user, id: Date.now() + Math.random() });
                }
            });

            return newUsers;
        });
    };

    return (
        <div className='app'>
            <h1 className='app-header'>GitHub Search</h1>
            <div className='search-container'>
                <SearchBar query={query} onQueryChange={setQuery} />
            </div>

            <Toolbar
                allSelected={selected.size === users.length && users.length > 0}
                toggleAll={toggleAll}
                selectedCount={selected.size}
                onDelete={onDelete}
                onDuplicate={onDuplicate}
                editMode={editMode}
                toggleEdit={() => setEditMode(!editMode)}
                totalCount={users.length}
            />

            <main className='userlist-scroll'>
                {loading && <p role='status'>Loading...</p>}
                {error && <p role='alert'>{error}</p>}
                {!loading && !error && <UserList
                    users={users}
                    selectedIds={selected}
                    toggleSelect={toggleSelect}
                    editMode={editMode}
                />}
            </main>
        </div>
    );
};

export default App;
