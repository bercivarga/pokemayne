import { useState, useEffect } from 'react';
import { getJSON } from '../store';
import { IndividualPokemonInterface } from '../interfaces';

export default function PokemonCard(props: { url: string }) {
	const [ pokeData, setPokeData ] = useState<IndividualPokemonInterface>();

	const { url } = props;

	useEffect(
		() => {
			const getIndividualPokemon = async () => {
				const fetchedIndividualPokemon = await getJSON(url);
				setPokeData(fetchedIndividualPokemon);
			};
			getIndividualPokemon();
		},
		[ url ]
	);

	return (
		<div className="mr-4 mb-4 bg-gray-100 hover:bg-gray-200 inline-block p-4 rounded-lg cursor-pointer">
			<div className="flex flex-row items-center">
				<img src={pokeData && pokeData.sprites.front_default} alt={pokeData && pokeData.name} />
				<div>
					<p className="font-bold text-lg">
						{pokeData && pokeData.name.replace(pokeData.name[0], pokeData.name[0].toUpperCase())}
					</p>
					<p>Height: {pokeData && pokeData.height}</p>
					<p>Base EXP: {pokeData && pokeData.base_experience}</p>
				</div>
			</div>
		</div>
	);
}
