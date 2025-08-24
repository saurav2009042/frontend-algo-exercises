import { IGithubUser } from '../interfaces';

export async function fetchGithubUsers(query: string, signal?: AbortSignal): Promise<IGithubUser[]> {
    if (!query) return [];

    try {
        const response = await fetch(`https://api.github.com/search/users?q=${encodeURIComponent(query)}`, { signal });

        if (response.status === 403) {
            throw new Error('rate_limit');
        }

        if (!response.ok) {
            throw new Error('network_error');
        }

        const data = await response.json();
        return data.items as IGithubUser[];

    } catch (err: any) {
        if (err.name === 'AbortError') {
            return [];
        }

        throw err;
    }
}
