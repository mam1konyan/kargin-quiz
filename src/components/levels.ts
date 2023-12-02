import type { Pairs, Levels } from '$lib/types';
import { getRandomThumbs } from '$lib/helpers';

export const getLevels = (data: Pairs[]): Levels[] => {
	let [easyPairs, hardPairs] = data;
	return [
		{
			label: 'Easy',
			size: 4,
			duration: 60 * 1000,
			thumbs: getRandomThumbs(easyPairs, 4)
		},
		{
			label: 'Hard',
			size: 6,
			duration: 60 * 1000,
			thumbs: getRandomThumbs(hardPairs, 6)
		}
	];
};
