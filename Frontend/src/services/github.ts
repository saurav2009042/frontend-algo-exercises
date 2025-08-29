import { IGithubUser } from '../interfaces';

/**
 * Fetch GitHub users based on a search query.
 *
 * @param query - The search string for GitHub users.
 * @param signal - Optional AbortSignal to cancel the request.
 * @returns Promise resolving to an array of IGithubUser.
 *
 * Notes:
 * - Returns an empty array if the query is empty or request is aborted.
 * - Throws 'rate_limit' error if API rate limit is exceeded.
 * - Throws 'network_error' for other non-OK responses.
 */

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
