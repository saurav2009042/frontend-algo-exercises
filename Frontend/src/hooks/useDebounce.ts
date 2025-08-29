import { useEffect, useState } from 'react';

/**
 * Custom React hook: useDebounce
 *
 * Returns a debounced version of a value that only updates after a specified delay.
 * Useful for delaying actions like API calls while the user is typing.
 *
 * @param value - The value to debounce.
 * @param delay - Delay in milliseconds before updating the debounced value.
 * @returns The debounced value.
 *
 * Example:
 * const debouncedSearch = useDebounce(searchTerm, 350);
 */

export function useDebounce<T>(value: T, delay: number): T {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debounced;
}
