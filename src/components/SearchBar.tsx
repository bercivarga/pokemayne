import React, { useState, useRef, useEffect, MutableRefObject } from 'react';
import { useGlobalContext } from '../store';
import { HiOutlineSearchCircle } from 'react-icons/hi';

export default function SearchBar(): JSX.Element {
	const [ input, setInput ] = useState<string>('');
	const [ showInput, setShowInput ] = useState<boolean>(false);

	const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

	const { searchPokemon } = useGlobalContext();

	useEffect(
		() => {
			if (showInput && inputRef.current) {
				inputRef.current.focus();
			}
		},
		[ showInput ]
	);

	const sendSearch = (e: React.FormEvent) => {
		e.preventDefault();
		const lowerCaseInput: string = input.toLowerCase();
		searchPokemon(lowerCaseInput);
	};

	if (!showInput)
		return (
			<button type="button" onClick={() => setShowInput(true)} className="mt-8 sm:mt-0">
				<HiOutlineSearchCircle className="h-10 w-10" />
			</button>
		);

	return (
		<form onSubmit={(e) => sendSearch(e)} className="mt-8 sm:mt-0">
			<input
				ref={inputRef}
				className="h-10 px-2 border-black border-4 rounded-sm"
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				onBlur={() => setShowInput(false)}
				placeholder="Search..."
			/>
		</form>
	);
}
