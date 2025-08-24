import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
    const mockOnQueryChange = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the input with correct placeholder and value', () => {
        render(<SearchBar query='test' onQueryChange={mockOnQueryChange} />);

        const input = screen.getByPlaceholderText(/search github users/i);

        expect(input).toBeInTheDocument();
        expect((input as HTMLInputElement).value).toBe('test');
        expect(input).toHaveAttribute('aria-label', 'Search GitHub Users');
    });

    it('calls onQueryChange when typing', () => {
        render(<SearchBar query='' onQueryChange={mockOnQueryChange} />);

        const input = screen.getByPlaceholderText(/search github users/i);
        fireEvent.change(input, { target: { value: 'saurav' } });

        expect(mockOnQueryChange).toHaveBeenCalledTimes(1);
        expect(mockOnQueryChange).toHaveBeenCalledWith('saurav');
    });

    it('updates value correctly when prop changes', () => {
        const { rerender } = render(<SearchBar query='initial' onQueryChange={mockOnQueryChange} />);
        const input = screen.getByPlaceholderText(/search github users/i);
        expect((input as HTMLInputElement).value).toBe('initial');

        rerender(<SearchBar query='updated' onQueryChange={mockOnQueryChange} />);
        expect((input as HTMLInputElement).value).toBe('updated');
    });

    it('has role="search" on container', () => {
        render(<SearchBar query='' onQueryChange={mockOnQueryChange} />);
        const container = screen.getByRole('search');
        expect(container).toBeInTheDocument();
    });

    it('does not call onQueryChange on unrelated events', () => {
        render(<SearchBar query='' onQueryChange={mockOnQueryChange} />);
        const input = screen.getByPlaceholderText(/search github users/i);

        fireEvent.blur(input);
        fireEvent.focus(input);

        expect(mockOnQueryChange).not.toHaveBeenCalled();
    });
});
