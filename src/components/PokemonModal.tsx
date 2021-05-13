import { useEffect } from 'react';
import { IndividualPokemonInterface } from '../interfaces';

type PropFunctionType = () => void;

export default function PokemonModal({
	toggleModal,
	pokeData
}: {
	pokeData: IndividualPokemonInterface;
	toggleModal: PropFunctionType;
}): JSX.Element {
	useEffect(
		() => {
			const close = (e: KeyboardEvent) => {
				if (e.keyCode === 27) {
					toggleModal();
				}
			};
			window.addEventListener('keydown', close);
			return () => window.removeEventListener('keydown', close);
		},
		[ toggleModal ]
	);

	if (!pokeData) return <h1>Something went wrong.</h1>;

	return (
		<div className="w-screen h-screen p-12 fixed inset-0 bg-gray-100 grid grid-cols-1 md:grid-cols-3 items-center z-10">
			<button
				onClick={() => toggleModal()}
				className="absolute top-12 right-12 rounded-full p-4 bg-gray-100 border-black border-2 leading-3"
			>
				X
			</button>
			<div className="flex flex-col justify-center items-center col-span-1">
				<img
					className="w-72"
					src={pokeData.sprites.front_default}
					alt={pokeData.name.replace(pokeData.name[0], pokeData.name[0].toUpperCase())}
				/>
				<p className="font-bold text-2xl">
					{pokeData.name.replace(pokeData.name[0], pokeData.name[0].toUpperCase())}
				</p>
				<p>Base EXP: {pokeData.base_experience}</p>
				<p>Weight: {pokeData.weight}</p>
			</div>
			<div className="text-left col-span-2">
				<div>
					<p className="font-bold text-xl">Forms</p>
					<div className="mt-2">
						{pokeData.forms.map((f) => {
							return <span key={f.name}>{f.name.replace(f.name[0], f.name[0].toUpperCase())}</span>;
						})}
					</div>
				</div>
				<div className="mt-4">
					<p className="font-bold text-xl">Stats</p>
					<div className="mt-2 grid grid-cols-1 md:grid-cols-3">
						{pokeData.stats.map((s) => {
							return (
								<div key={s.stat.name}>
									<p className="font-bold">
										{s.stat.name.replace(s.stat.name[0], s.stat.name[0].toUpperCase())}:
									</p>
									<p>{s.base_stat}</p>
								</div>
							);
						})}
					</div>
				</div>
				<div className="mt-4">
					<p className="font-bold text-xl">Abilities</p>
					<div className="mt-2 grid grid-cols-2 md:grid-cols-6">
						{pokeData.abilities.map((a) => {
							return (
								<span key={a.ability.name}>
									{a.ability.name.replace(a.ability.name[0], a.ability.name[0].toUpperCase())}
								</span>
							);
						})}
					</div>
				</div>
				<div className="mt-4">
					<p className="font-bold text-xl">Moves</p>
					<div className="mt-2 grid grid-cols-2 md:grid-cols-6">
						{pokeData.moves.map((m) => {
							return (
								<span key={m.move.name}>
									{m.move.name.replace(m.move.name[0], m.move.name[0].toUpperCase())}
								</span>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
