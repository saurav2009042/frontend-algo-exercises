/**
 * FizzBuzz implementation in TypeScript
 *
 * Rules:
 * - Divisible by 3 → "Fizz"
 * - Divisible by 5 → "Buzz"
 * - Divisible by both 3 & 5 → "FizzBuzz"
 * - Otherwise → number itself
 *
 * @param n - Upper bound of the sequence
 * @returns Array<string | number> - FizzBuzz sequence
 */
export function fizzBuzz(n: number): Array<string | number> {
    if (n < 1) {
        throw new Error('Input must be a positive integer greater than 0.');
    }

    return Array.from({ length: n }, (_, i) => {
        const num = i + 1;
        const fizz = num % 3 === 0;
        const buzz = num % 5 === 0;

        if (fizz && buzz) return 'FizzBuzz';
        if (fizz) return 'Fizz';
        if (buzz) return 'Buzz';

        return num;
    });
}
