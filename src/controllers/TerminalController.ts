import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const terminal = readline.createInterface({ input, output });

export class TerminalController {
  async iniciar() {
    const resposta = await terminal.question("Informe o Nome ou ID do Pokémon que deseja buscar: ");
    terminal.close();
    return resposta;
  }

  async salvarPokemon(pokemon: any) {
    const resposta = await terminal.question("Deseja salvar as informações do Pokémon em um arquivo? (S/N): ");
    terminal.close();
    return resposta;
  }

}