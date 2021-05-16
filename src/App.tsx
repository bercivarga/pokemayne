import React, { ReactElement } from 'react';
import { AppProvider } from './store';
import PokemonList from './components/PokemonList';

function App(): ReactElement {
	return (
		<AppProvider>
			<PokemonList />
		</AppProvider>
	);
}

export default App;
