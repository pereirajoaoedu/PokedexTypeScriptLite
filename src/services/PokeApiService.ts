import type { PokemonApiResponse } from "../interfaces/PokemonApi.js";
import { PokemonResumido } from "../models/Pokemon.js";
import { Capitalizar } from "../utils/textFormatters.js";

export class PokemonApiService {

    async buscarPokemon(NomeOuId: string): Promise<PokemonResumido[]> {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${NomeOuId.toLowerCase()}`);

            if (!response.ok) {
                console.log(`[ERRO] Pokémon não encontrado.`);
                return [];
            }

            const dados: PokemonApiResponse = await response.json();
            const tiposCapitalizados = dados.types.map((item: any) => Capitalizar(item.type.name));

            return [new PokemonResumido(
                dados.id,
                Capitalizar(dados.name),
                dados.height,
                dados.weight,
                tiposCapitalizados
            )];

        } catch (error) {
            console.error(`[ERRO] Não foi possível buscar o Pokémon. Motivo: `, error);
            return [];
        }
    }
}