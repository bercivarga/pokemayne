export interface FetchedPokemonInterface {
	name: string;
	url: string;
}

export interface IndividualPokemonInterface {
	abilities: Object[];
	base_experience: number;
	forms: Object[];
	game_indices: Object[];
	height: number;
	held_items: Array<any>;
	id: number;
	is_default: boolean;
	location_area_encounters: string;
	moves: Object[];
	name: string;
	order: number;
	past_types: Array<any>;
	species: { name: string; url: string };
	sprites: { front_default: string };
	stats: Object[];
	types: Object[];
	weight: number;
}
