import { FetchedPokemonInterface } from '../interfaces';
import { useGlobalContext } from '../store';
import PokemonCard from './PokemonCard';

export default function PokemonList() {
	const { pokemon, changePage } = useGlobalContext();
	return (
		<div>
			{pokemon.map((p: FetchedPokemonInterface) => <PokemonCard key={p.name} url={p.url} />)}
			<button type="button" onClick={() => changePage('prev')}>
				Previous page
			</button>
			<button type="button" onClick={() => changePage('next')}>
				Next page
			</button>
		</div>
	);
}
