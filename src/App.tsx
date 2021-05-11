import { AppProvider } from './store';
import PokemonList from './components/PokemonList';

function App() {
	return (
		<AppProvider>
			<PokemonList />
		</AppProvider>
	);
}

export default App;
