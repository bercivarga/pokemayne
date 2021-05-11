import { FetchedPokemonInterface } from '../interfaces';
import { useGlobalContext } from '../store';
import PokemonCard from './PokemonCard';

export default function PokemonList() {
	const { pokemon } = useGlobalContext();
	return <div>{pokemon.map((p: FetchedPokemonInterface) => <PokemonCard key={p.name} url={p.url} />)}</div>;
}
