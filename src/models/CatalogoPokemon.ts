import { PokemonResumido } from "./Pokemon.js";
import { BoxService } from "../services/BoxService.js";
import { TerminalController } from "../controllers/TerminalController.js";

export class CatalogoPokemon {
  private pokemons: PokemonResumido[] = [];
  private boxService = new BoxService();

  adicionar(pokemon: PokemonResumido): void {
    this.boxService.salvar(pokemon);
  }

  async listar(): Promise<Boolean> {
    
    this.pokemons = await this.boxService.lerArquivo();
    
    if (this.pokemons.length === 0) {
      return false;
    }

    console.clear()
    console.log('========= CATÁLOGO =========')

    this.pokemons.forEach((dados) => {
      const pokemon = new PokemonResumido(
        dados.id,
        dados.nome,
        dados.altura,
        dados.peso,
        dados.tipos
      )

      console.log(pokemon.apresentarPokemon());
      console.log('----------------------------------')
    });

    return true;
  }

  async remover(id: number): Promise<Boolean> {
    this.pokemons = await this.boxService.lerArquivo();
    const existe = this.pokemons.some((p) => p.id === id);

    if (!existe) {
      return false;
    }

    this.pokemons = this.pokemons.filter((p) => p.id !== id);
    return true;
  }

}