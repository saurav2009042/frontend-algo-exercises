export interface IUserCardProps {
    user: IGithubUser;
    selected: boolean;
    onToggle: () => void;
    editMode: boolean;
}

export interface IUserListProps {
    users: IGithubUser[];
    selectedIds: Set<number>;
    toggleSelect: (id: number) => void;
    editMode: boolean;
}

export interface IGithubUser {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
}
