// Camada de Interface do Usuário. Gerencia entrada do terminal e orquestra exibições.

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const terminal = readline.createInterface({ input, output });

export class TerminalController {
  async iniciar() {
    const nome = await terminal.question("Informe o Nome ou ID do Pokémon que deseja buscar: ");
    terminal.close();
    return nome;
  }
}