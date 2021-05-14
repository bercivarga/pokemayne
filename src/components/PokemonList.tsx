import { useMemo } from 'react';
import { FetchedPokemonInterface } from '../interfaces';
import { useGlobalContext } from '../store';
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';
import ErrorMessage from './ErrorMessage';

export default function PokemonList() {
	const { pokemon, changePage, prevPage, nextPage, searchedPokemon, failedFetch } = useGlobalContext();

	const MemoizedGrid = useMemo(
		() => {
			return (
				<div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-3 2xl:grid-cols-5">
					{searchedPokemon ? (
						<PokemonCard url={`https://pokeapi.co/api/v2/pokemon/${searchedPokemon}`} />
					) : (
						pokemon.map((p: FetchedPokemonInterface) => <PokemonCard key={p.name} url={p.url} />)
					)}
				</div>
			);
		},
		[ searchedPokemon, pokemon ]
	);

	return (
		<div className="px-4 lg:px-64 py-8 lg:py-12">
			<div className="flex flex-col lg:flex-row justify-between lg:items-center">
				<h1 className="font-bold text-5xl">
					P<span className="text-red-600">o</span>kemayne &ndash; Gotta catch 'em all!
				</h1>
				<SearchBar />
			</div>
			{failedFetch ? <ErrorMessage /> : MemoizedGrid}
			{!searchedPokemon && (
				<div className="mt-4 flex flex-row justify-between">
					<button
						type="button"
						onClick={() => changePage('prev')}
						className="p-6 bg-gray-300 rounded-lg text-2xl font-bold hover:bg-gray-400 disabled:opacity-50 disabled:bg-gray-300 disabled:cursor-not-allowed"
						disabled={prevPage ? false : true}
					>
						Previous page
					</button>
					<button
						type="button"
						onClick={() => changePage('next')}
						className="p-6 bg-gray-300 rounded-lg text-2xl font-bold hover:bg-gray-400 disabled:opacity-50 disabled:bg-gray-300 disabled:cursor-not-allowed"
						disabled={nextPage ? false : true}
					>
						Next page
					</button>
				</div>
			)}
		</div>
	);
}
