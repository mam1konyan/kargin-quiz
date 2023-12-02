export interface Thumb {
	url: string;
	id: string;
	match: string;
	level: string;
}

export interface Points {
	correct: number;
	left: number;
	second: number;
}

export type Pair = Thumb[];
export type Pairs = Pair[];

export interface Level {
	label: string;
	size: number;
	duration: number;
	thumbs: Thumb[];
	points: Points;
}
