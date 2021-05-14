import { FetchedPokemonInterface } from '../interfaces';
import { useGlobalContext } from '../store';
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';

export default function PokemonList() {
	const { pokemon, changePage, prevPage, nextPage } = useGlobalContext();
	return (
		<div className="px-64 py-12">
			<div className="flex flex-col lg:flex-row justify-between lg:items-center">
				<h1 className="font-bold text-5xl">Pokemayne &ndash; Gotta catch 'em all!</h1>
				<SearchBar />
			</div>
			<div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-3 2xl:grid-cols-5">
				{pokemon.map((p: FetchedPokemonInterface) => <PokemonCard key={p.name} url={p.url} />)}
			</div>
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
		</div>
	);
}
