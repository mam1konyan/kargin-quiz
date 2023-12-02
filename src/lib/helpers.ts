import type { Pairs, Thumb } from './types';

export const shuffleArray = <T>(arr: T[]): T[] => arr.slice().sort(() => Math.random() - 0.5);

export const getRandomElementsFromArray = <T>(arr: T[], num: number): T[] => {
	// Check if the array is empty or if the number is greater than the array length
	if (num > arr.length) {
		console.error('Invalid input: number is greater than array length');
		return [];
	}

	// Shuffle the array to get random order of elements
	const shuffledArray = shuffleArray(arr);

	// Slice the array to get the desired number of random elements
	return shuffledArray.slice(0, num);
};
export const getRandomThumbs = (pairs: Pairs = [], size: number = 0): Thumb[] => {
	if (!pairs.length) return [];

	const randomPairs = getRandomElementsFromArray(pairs, size * 2);

	return shuffleArray(randomPairs.flat());
};
