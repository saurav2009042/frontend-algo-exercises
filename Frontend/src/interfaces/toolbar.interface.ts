export interface IToolbarProps {
    allSelected: boolean;
    toggleAll: () => void;
    selectedCount: number;
    onDelete: () => void;
    onDuplicate: () => void;
    editMode: boolean;
    toggleEdit: () => void;
    totalCount: number;
}
