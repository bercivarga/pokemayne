import React, { useState, useEffect, useCallback } from 'react';
import { IndividualPokemonInterface } from '../interfaces';
import PokemonModal from './PokemonModal';
import { useGlobalContext } from '../store';

export default function PokemonCard(props: { url: string }): JSX.Element {
	const [ pokeData, setPokeData ] = useState<IndividualPokemonInterface>();
	const [ showModal, setShowModal ] = useState<boolean>(false);

	const { url }: { url: string } = props;

	const { getJSON } = useGlobalContext();

	const toggleModal = useCallback(
		(): void => {
			setShowModal(!showModal);
		},
		[ showModal ]
	);

	useEffect(
		(): void => {
			const getIndividualPokemon = async () => {
				const fetchedIndividualPokemon = await getJSON(url);
				setPokeData(fetchedIndividualPokemon);
			};
			getIndividualPokemon();
		},
		[ url, getJSON ]
	);

	// check if this is an appropriate solution for similar problems

	return (
		<div>
			{showModal && <PokemonModal toggleModal={toggleModal} pokeData={pokeData as IndividualPokemonInterface} />}
			<button
				type="button"
				onClick={() => toggleModal()}
				className="h-full w-full mr-4 mb-4 bg-gray-100 hover:bg-gray-200 inline-block p-4 rounded-lg cursor-pointer"
			>
				<div className="flex flex-row items-center justify-center">
					<div className="w-24 h-24">
						<img
							className="object-contain h-full w-full"
							src={pokeData && pokeData.sprites.front_default}
							alt={pokeData && pokeData.name}
						/>
					</div>
					<div>
						<div className="font-bold text-lg">
							{pokeData ? (
								pokeData.name.replace(pokeData.name[0], pokeData.name[0].toUpperCase())
							) : (
								<p className="h-6" />
							)}
						</div>
						<p>Height: {pokeData && pokeData.height}</p>
						<p>Base EXP: {pokeData && pokeData.base_experience}</p>
					</div>
				</div>
			</button>
		</div>
	);
}
