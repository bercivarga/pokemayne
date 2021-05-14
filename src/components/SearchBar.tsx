import React, { useState } from 'react';
import { useGlobalContext } from '../store';

export default function SearchBar() {
	const [ input, setInput ] = useState<string>('');

	const { searchPokemon } = useGlobalContext();

	const sendSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (!input) return;
		searchPokemon(input);
	};

	return (
		<form onSubmit={(e) => sendSearch(e)} className="border-black border-4 rounded-sm">
			<input
				className="px-2"
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder="Search..."
			/>
		</form>
	);
}
