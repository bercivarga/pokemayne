import { IndividualPokemonInterface } from '../interfaces';

export default function PokemonModal(pokeData: IndividualPokemonInterface): JSX.Element {
	if (!pokeData) return <h1>Something went wrong.</h1>;

	return (
		<div>
			<img
				src={pokeData.sprites.front_default}
				alt={pokeData.name.replace(pokeData.name[0], pokeData.name[0].toUpperCase())}
			/>
			<p className="font-bold text-2xl">
				{pokeData.name.replace(pokeData.name[0], pokeData.name[0].toUpperCase())}
			</p>
			<p>Base EXP: {pokeData.base_experience}</p>
			<p>Weight: {pokeData.weight}</p>
			<div>
				<p>Forms</p>
				{pokeData.forms.map((f) => {
					return <span key={f.name}>{f.name}</span>;
				})}
			</div>
			<div>
				<p className="font-bold text-lg">Stats</p>
				{pokeData.stats.map((s) => {
					return (
						<div key={s.stat.name}>
							<p>{s.stat.name.replace(s.stat.name[0], s.stat.name[0].toUpperCase())}:</p>
							<p>{s.base_stat}</p>
						</div>
					);
				})}
			</div>
			<div>
				<p className="font-bold text-lg">Abilities</p>
				{pokeData.abilities.map((a) => {
					return (
						<span key={a.ability.name}>
							{a.ability.name.replace(a.ability.name[0], a.ability.name[0].toUpperCase())} |{' '}
						</span>
					);
				})}
			</div>
			<div>
				<p className="font-bold text-lg">Moves</p>
				{pokeData.moves.map((m) => {
					return (
						<span key={m.move.name}>
							{m.move.name.replace(m.move.name[0], m.move.name[0].toUpperCase())} |{' '}
						</span>
					);
				})}
			</div>
		</div>
	);
}
