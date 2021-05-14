import React, { useState } from 'react';
import { useGlobalContext } from '../store';

export default function SearchBar() {
	const [ input, setInput ] = useState<string>('');

	const { searchPokemon } = useGlobalContext();

	const sendSearch = (e: React.FormEvent) => {
		e.preventDefault();
		const lowerCaseInput: string = input.toLowerCase();
		searchPokemon(lowerCaseInput);
	};

	return (
		<form onSubmit={(e) => sendSearch(e)}>
			<input
				className="px-2 border-black border-4 rounded-sm"
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder="Search..."
			/>
		</form>
	);
}
