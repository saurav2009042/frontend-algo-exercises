import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import UserCard from './UserCard';

const mockUser = {
    login: 'verylongusername1234567890',
    id: 12345,
    avatar_url: 'https://example.com/avatar.png',
    html_url: 'https://github.com/verylongusername1234567890'
};

describe('UserCard Component', () => {

    test('renders avatar, login, ID and View Profile button', () => {
        render(<UserCard user={mockUser} selected={false} onToggle={() => {}} editMode={false} />);

        expect(screen.getByAltText(`Avatar of ${mockUser.login}`)).toBeInTheDocument();
        expect(screen.getByText(mockUser.login)).toBeInTheDocument();
        expect(screen.getByText(`ID: ${mockUser.id}`)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: `View profile of ${mockUser.login}` })).toBeInTheDocument();
    });

    test('checkbox is visible only in edit mode', () => {
        const { rerender } = render(<UserCard user={mockUser} selected={false} onToggle={() => {}} editMode={false} />);
        expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();

        rerender(<UserCard user={mockUser} selected={false} onToggle={() => {}} editMode={true} />);
        expect(screen.getByRole('checkbox', { name: `Select user ${mockUser.login}` })).toBeInTheDocument();
    });

    test('checkbox toggles correctly when clicked', () => {
        const onToggleMock = jest.fn();
        render(<UserCard user={mockUser} selected={false} onToggle={onToggleMock} editMode={true} />);
        const checkbox = screen.getByRole('checkbox', { name: `Select user ${mockUser.login}` });

        fireEvent.click(checkbox);
        expect(onToggleMock).toHaveBeenCalledTimes(1);
    });

    test('image fallback works when avatar fails to load', () => {
        render(<UserCard user={mockUser} selected={false} onToggle={() => {}} editMode={false} />);
        const avatar = screen.getByAltText(`Avatar of ${mockUser.login}`);

        fireEvent.error(avatar);
        expect(avatar).toHaveAttribute('src', '/placeholder.png');
    });

    test('strong and ID elements have correct tooltip', () => {
        render(<UserCard user={mockUser} selected={false} onToggle={() => {}} editMode={false} />);
        expect(screen.getByText(mockUser.login)).toHaveAttribute('title', mockUser.login);
        expect(screen.getByText(`ID: ${mockUser.id}`)).toHaveAttribute('title', String(mockUser.id));
    });

    test('renders correctly with selected checkbox', () => {
        render(<UserCard user={mockUser} selected={true} onToggle={() => {}} editMode={true} />);
        const checkbox = screen.getByRole('checkbox', { name: `Select user ${mockUser.login}` });
        expect(checkbox).toBeChecked();
    });

    test('card has focusable tabIndex for accessibility', () => {
        render(<UserCard user={mockUser} selected={false} onToggle={() => {}} editMode={false} />);
        const card = screen.getByLabelText(`Github user ${mockUser.login}`);
        expect(card).toHaveAttribute('tabIndex', '0');
    });

    test('matches snapshot - edit mode OFF', () => {
        const tree = renderer
            .create(<UserCard user={mockUser} selected={false} onToggle={() => {}} editMode={false} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot - edit mode ON, selected', () => {
        const tree = renderer
            .create(<UserCard user={mockUser} selected={true} onToggle={() => {}} editMode={true} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

});
