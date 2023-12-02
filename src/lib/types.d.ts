export interface Thumb {
	url: string;
	id: string;
	match: string;
	level: string;
}

export type Pair = Thumb[];
export type Pairs = Pair[];

export interface Levels {
	label: string;
	size: number;
	duration: number;
	thumbs: Thumb[];
}
