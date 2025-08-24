import { IGithubUser } from '@interfaces/user.interface';
import { fireEvent, render, screen } from '@testing-library/react';
import UserList from './UserList';

const mockUsers: IGithubUser[] = [
    { id: 1, login: 'user1', avatar_url: 'https://example.com/avatar1.png', html_url: 'https://github.com/user1' },
    { id: 2, login: 'user2', avatar_url: 'https://example.com/avatar2.png', html_url: 'https://github.com/user2' },
];

describe('UserList Component', () => {
    test('renders "No results" when users list is empty', () => {
        render(<UserList users={[]} selectedIds={new Set()} toggleSelect={() => {}} editMode={false} />);
        expect(screen.getByText(/no results/i)).toBeInTheDocument();
    });

    test('renders users in list', () => {
        render(<UserList users={mockUsers} selectedIds={new Set()} toggleSelect={() => {}} editMode={false} />);

        expect(screen.getByText('user1')).toBeInTheDocument();
        expect(screen.getByText('user2')).toBeInTheDocument();

        expect(screen.getAllByRole('img')).toHaveLength(2);
        expect(screen.getAllByRole('button', { name: /view profile/i })).toHaveLength(2);
    });

    test('renders checkboxes in edit mode', () => {
        render(<UserList users={mockUsers} selectedIds={new Set()} toggleSelect={() => {}} editMode={true} />);

        const firstCheckbox = screen.getByLabelText('Select user user1') as HTMLInputElement;
        const secondCheckbox = screen.getByLabelText('Select user user2') as HTMLInputElement;

        expect(firstCheckbox).toBeInTheDocument();
        expect(secondCheckbox).toBeInTheDocument();
    });

    test('checkboxes reflect selectedIds state', () => {
        const selectedIds = new Set([1]);
        render(<UserList users={mockUsers} selectedIds={selectedIds} toggleSelect={() => {}} editMode={true} />);

        const firstCheckbox = screen.getByLabelText('Select user user1') as HTMLInputElement;
        const secondCheckbox = screen.getByLabelText('Select user user2') as HTMLInputElement;

        expect(firstCheckbox.checked).toBe(true);
        expect(secondCheckbox.checked).toBe(false);
    });

    test('calls toggleSelect when checkbox is clicked', () => {
        const toggleMock = jest.fn();
        render(<UserList users={mockUsers} selectedIds={new Set()} toggleSelect={toggleMock} editMode={true} />);

        const firstCheckbox = screen.getByLabelText('Select user user1') as HTMLInputElement;
        fireEvent.click(firstCheckbox);

        expect(toggleMock).toHaveBeenCalledTimes(1);
        expect(toggleMock).toHaveBeenCalledWith(1);
    });
});
