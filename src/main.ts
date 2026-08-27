// Ponto de entrada. Instancia os serviços, injeta as dependências e inicia o loop principal do menu.

import { TerminalController } from './controllers/TerminalController.js';
import { PokemonApiService } from './services/PokeApiService.js';

async function main(): Promise<void> {
    const terminalController = new TerminalController();
    var resposta = await terminalController.iniciar();

    if (resposta) {
        const pokeApiService = new PokemonApiService();
        await pokeApiService.buscarPokemon(resposta);
    }

}

main();