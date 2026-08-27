// Camada de Integração Externa (fetch nativo). Retorna Promises tipadas com Interfaces.

import type { PokemonApiResponse } from "../interfaces/PokemonApi.js";
import { PokemonResumido } from "../models/Pokemon.js";

export class PokemonApiService {

    async buscarPokemon(NomeOuId: string): Promise<PokemonResumido[]> {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${NomeOuId.toLowerCase()}`);

            if (!response.ok) {
                console.log(`[ERRO] Pokémon não encontrado.`);
                return [];
            }

            const dados: PokemonApiResponse = await response.json();
            return [PokemonResumido.fromApiResponse(dados)];
        } catch (error) {
            console.error(`[ERRO] Não foi possível buscar o Pokémon. Motivo: `, error);
            return [];
        }
    }
}