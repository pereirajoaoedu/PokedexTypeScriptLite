// Ponto de entrada. Instancia os serviços, injeta as dependências e inicia o loop principal do menu.

import { TerminalController } from './controllers/TerminalController.js';
import { PokemonApiService } from './services/PokeApiService.js';

async function main(): Promise<void> {
    const terminalController = new TerminalController();
    const pokeApiService = new PokemonApiService();
    var resposta = await terminalController.iniciar();

    try {
        var encerrarBusca = "N";

            const pokemon = await pokeApiService.buscarPokemon(resposta);

            pokemon.forEach(p => {
                console.log(p.apresentarPokemon());
            });

    } catch (error) {
        console.error('Erro ao executar a aplicação.', error);
    }
}

main();