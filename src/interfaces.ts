export interface FetchedPokemonInterface {
	name: string;
	url: string;
}

type MovesType = {
	move: {
		name: string;
		url?: string;
	};
};

type AbilitiesType = {
	ability: {
		name: string;
		url?: string;
	};
};

type FormsType = {
	name: string;
	url?: string;
};

type StatType = {
	base_stat: number;
	effort: number;
	stat: {
		name: string;
		url?: string;
	};
};

export interface IndividualPokemonInterface {
	abilities: AbilitiesType[];
	base_experience: number;
	forms: FormsType[];
	game_indices: any[]; // fix any type
	height: number;
	held_items: Array<any>; // fix any type
	id: number;
	is_default: boolean;
	location_area_encounters: string;
	moves: MovesType[];
	name: string;
	order: number;
	past_types: Array<any>; // fix any type
	species: { name: string; url: string };
	sprites: { front_default: string };
	stats: StatType[];
	types: any[]; // fix any type
	weight: number;
}
