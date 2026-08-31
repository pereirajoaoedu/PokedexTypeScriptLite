import { PokemonApiService } from './services/PokeApiService.js';
import { CatalogoPokemon } from './models/CatalogoPokemon.js';
import { TerminalController } from './controllers/TerminalController.js';

async function main() {
  const apiService = new PokemonApiService();
  const catalogoService = new CatalogoPokemon(); 
  const terminal = new TerminalController(apiService, catalogoService);
  await terminal.menuInicial(true); 
}

main();
