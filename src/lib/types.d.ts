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
	duration: number;
	thumbs: Thumb[];
	points: Points;
}

export type GameState = 'waiting' | 'playing' | 'won' | 'lost';
