import type { Pairs, Level } from '$lib/types';
import { getRandomThumbs } from '$lib/helpers';

export const getLevels = (data: Pairs[]): Level[] => {
	let [easyPairs, hardPairs] = data;
	return [
		{
			label: 'Easy',
			size: 4,
			duration: 60 * 1000,
			thumbs: getRandomThumbs(easyPairs, 4),
			points: {
				correct: 6,
				left: -1,
				second: 3
			}
		},
		{
			label: 'Hard',
			size: 6,
			duration: 60 * 1000,
			thumbs: getRandomThumbs(hardPairs, 6),
			points: {
				correct: 10,
				left: -7,
				second: 7
			}
		}
	];
};
