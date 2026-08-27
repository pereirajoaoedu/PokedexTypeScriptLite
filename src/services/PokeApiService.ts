// Camada de Integração Externa (fetch nativo). Retorna Promises tipadas com Interfaces.

import type { PokemonApiResponse } from "../interfaces/PokemonApi.js";
import { PokemonResumido } from "../models/Pokemon.js";

export class PokemonApiService {

    async buscarPokemon(NomeOuId: string): Promise<PokemonResumido[]> {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${NomeOuId.toLowerCase()}`);

            if (!response.ok) {
                throw new Error(`Erro ao buscar Pokémon com Nome ou ID ${NomeOuId}: ${response.statusText}`);
            }

            const dados: PokemonApiResponse[] = await response.json();
            return dados.map((pokemon) => PokemonResumido.fromApiResponse(pokemon));
        } catch (error) {
            console.error(`Erro ao buscar Pokémon com Nome ou ID: ${NomeOuId}:`, error);
            throw error;
        }
    }
}