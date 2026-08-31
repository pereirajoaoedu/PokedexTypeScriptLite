import fs from 'node:fs/promises';
import { PokemonResumido } from '../models/Pokemon.js';

export class BoxService {
  private readonly caminhoArquivo = 'pc_box.json';

  async lerArquivo(): Promise<PokemonResumido[]> {

    try {
      const dados = await fs.readFile(this.caminhoArquivo, 'utf-8');
      return JSON.parse(dados);
    } catch (erro: any) {

      if (erro.code === 'ENOENT') {
        return [];
      }

      throw erro;
    }

  }

  async salvar(pokemon: PokemonResumido): Promise<void> {
    const arquivo = await this.lerArquivo();

    const jaExiste = arquivo.some((p) => p.id === pokemon.id);
    
    if (jaExiste) {
      console.log(`[AVISO] O Pokémon ${pokemon.nome} já está salvo no catálogo!`);
      return;
    }

    arquivo.push(pokemon);
    await fs.writeFile(this.caminhoArquivo, JSON.stringify(arquivo, null, 2));
    
    console.log(`[OK] ${pokemon.nome} foi guardado no catálogo com sucesso!`);
  }

}