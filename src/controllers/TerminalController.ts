import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { PokemonResumido } from '../models/Pokemon.js';
import { setTimeout } from 'node:timers';
import { CustomErrors } from '../models/CustomErrors.js';
import { PokemonApiService } from '../services/PokeApiService.js';
import type { CatalogoPokemon } from '../models/CatalogoPokemon.js';

const terminal = readline.createInterface({ input, output });
const aguardar = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

export class TerminalController {

  constructor(
    private pokemonApiService: PokemonApiService,
    private catalogoService: CatalogoPokemon 
  ) {}

  async apresentar(): Promise<void> {
    console.clear();
    console.log(`${"--------------------------------------"}`);
    console.log("Olá treinador, bem-vindo à Pokedex Lite!");
    await aguardar(1000);
    console.log("Você pode buscar informações sobre qualquer Pokémon pelo Nome ou ID.");
    await aguardar(1000);
  }
  
  async menuInicial(exibeApresentacao: boolean): Promise<void> { 
    
    if (exibeApresentacao) {
     await this.apresentar();
    }

    console.log("Por favor, escolha uma das opções abaixo:")
    await aguardar(500);
    console.log(["1 - Pesquisar Pokemon","2 - Consultar Catálogo","0 - Sair"].join("\n"));

    const resposta = await terminal.question("Opção Desejada: ");

    await aguardar(500);

    switch (resposta) {
      case "0":
        this.encerrarPrograma();
        break;
      case "1":
          this.menuPesquisarPokemon();
          break;
      case "2":
        this.menuConsultarCatalogo();
        break;
      default:
          console.log("Opção escolhida inválida.")
          await aguardar(1000);
          console.clear();
          this.menuInicial(false);
    }
    
  }

  encerrarPrograma(): void {
    console.log("Obrigado por usar nossos serviços, tenha uma boa aventura!")
    terminal.close();
  }

  async menuPesquisarPokemon(): Promise<void> {
    const pokemonPesquisar = await terminal.question("Informe o Nome ou ID de seu Pokémon: ");

    if (pokemonPesquisar.trim() === '') {
        console.clear();
        CustomErrors.msgRespostaInvalida();
        console.log("Resposta inválida.");
        await aguardar(800);
        return this.menuPesquisarPokemon();
    }

    const pokemonLocalizado = await this.pokemonApiService.buscarPokemon(pokemonPesquisar);

    pokemonLocalizado.forEach(pokemon => {console.log(pokemon.apresentarPokemon())});

    const respostaMenu = await terminal.question(["O que deseja fazer?","1 - Salvar no Catálogo","2 - Retornar ao Menu Inicial","0 - Sair","Resposta: "].join("\n"))

    switch (respostaMenu) {
      case "1":
        pokemonLocalizado.forEach(pokemon => this.catalogoService.adicionar(pokemon));
        aguardar(500);
        this.menuInicial(false);
        break;
      case "2":
        console.clear();
        this.menuInicial(false);
        break;
      case "0":
        this.encerrarPrograma();
        break;
      default:
        console.log("Opção escolhida inválida.")
        await aguardar(1000);
        console.clear();
        this.menuInicial(false);
    }

  }

  async menuConsultarCatalogo(): Promise<void> {
    console.clear();
    const respostaMenu = await terminal.question(["O que deseja fazer?","1 - Exibir Todos os Pokemons","2 - Deletar Pokémon do Catálogo","3 - Voltar ao Menu Inicial","0 - Sair","Resposta: "].join("\n"))

    switch(respostaMenu) {
      case "1":
        const retornoListar = await this.catalogoService.listar();

        if (retornoListar == false) {
          console.clear()
          console.log("[AVISO] O catálogo está vazio, você não capturou nenhum Pokémon.");
          await aguardar(500);
          console.log("Retornando ao Menu Inicial...");
          await aguardar(500);
          await this.menuInicial(false);
        }
        else {
          await this.menuConsultarCatalogo();
        }

        break;
      case "2":
        const respostaDeletar = parseInt(await terminal.question("Informe o ID do Pokémon para Deletar: "));

        const deletado = await this.catalogoService.remover(respostaDeletar);

        if (!deletado) {
          console.log("[AVISO] Nenhum Pokémon encontrado com esse ID.");
        }
        else {
          console.log("[OK] Pokémon removido do catálogo.");
          await aguardar(500);
          this.menuConsultarCatalogo();
        }

        break;
      case "3":
        this.menuInicial(false);
        break;
      case "0":
        this.encerrarPrograma();
        break;
      default:
        console.log("Opção escolhida inválida.")
        await aguardar(1000);
        console.clear();
        this.menuInicial(false);
    }
  }

}