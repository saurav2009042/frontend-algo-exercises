import { fireEvent, render, screen } from '@testing-library/react';
import Toolbar from './Toolbar';

describe('Toolbar Component', () => {
  const mockToggleEdit = jest.fn();
  const mockToggleAll = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnDuplicate = jest.fn();

  const defaultProps = {
    allSelected: false,
    toggleAll: mockToggleAll,
    selectedCount: 0,
    totalCount: 3,
    onDelete: mockOnDelete,
    onDuplicate: mockOnDuplicate,
    editMode: false,
    toggleEdit: mockToggleEdit,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Edit Mode button and toggles text', () => {
    render(<Toolbar {...defaultProps} />);
    const button = screen.getByRole('button', { name: /enter edit mode/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockToggleEdit).toHaveBeenCalledTimes(1);
  });

  test('renders Select All checkbox with selected count in edit mode', () => {
    render(<Toolbar {...defaultProps} editMode={true} selectedCount={2} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    const labelText = screen.getByText(/2 elements selected/i);
    expect(labelText).toBeInTheDocument();
  });

  test('checkbox shows indeterminate state when partially selected', () => {
    render(<Toolbar {...defaultProps} editMode={true} selectedCount={1} />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });

  test('duplicate and delete buttons are disabled when selectedCount is 0', () => {
    render(<Toolbar {...defaultProps} editMode={true} selectedCount={0} />);
    const duplicateBtn = screen.getByRole('button', { name: /duplicate/i });
    const deleteBtn = screen.getByRole('button', { name: /delete/i });
    expect(duplicateBtn).toBeDisabled();
    expect(deleteBtn).toBeDisabled();
  });

  test('duplicate and delete buttons call handlers when clicked', () => {
    render(<Toolbar {...defaultProps} editMode={true} selectedCount={2} />);
    const duplicateBtn = screen.getByRole('button', { name: /duplicate/i });
    const deleteBtn = screen.getByRole('button', { name: /delete/i });

    fireEvent.click(duplicateBtn);
    fireEvent.click(deleteBtn);

    expect(mockOnDuplicate).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  test('toggleAll checkbox calls toggleAll handler', () => {
    render(<Toolbar {...defaultProps} editMode={true} selectedCount={1} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockToggleAll).toHaveBeenCalledTimes(1);
  });
});
