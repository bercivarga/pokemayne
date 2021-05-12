import { useState, useEffect } from 'react';
import { getJSON } from '../store';
import { IndividualPokemonInterface } from '../interfaces';
import PokemonModal from './PokemonModal';

export default function PokemonCard(props: { url: string }): JSX.Element {
	const [ pokeData, setPokeData ] = useState<IndividualPokemonInterface>();
	const [ showModal, setShowModal ] = useState<boolean>(false);

	const { url }: { url: string } = props;

	const toggleModal = (): void => {
		setShowModal(!showModal);
	};

	useEffect(
		(): void => {
			const getIndividualPokemon = async () => {
				const fetchedIndividualPokemon = await getJSON(url);
				setPokeData(fetchedIndividualPokemon);
			};
			getIndividualPokemon();
		},
		[ url ]
	);

	return (
		<button
			type="button"
			onClick={() => toggleModal()}
			className="mr-4 mb-4 bg-gray-100 hover:bg-gray-200 inline-block p-4 rounded-lg cursor-pointer"
		>
			{showModal && <PokemonModal {...pokeData as any} />}
			{/******************** fix any type ********************/}
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
		</button>
	);
}
