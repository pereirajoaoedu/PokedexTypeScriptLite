import type { PokemonApiResponse } from "../interfaces/PokemonApi.js";
import type { Pokemon } from "../interfaces/Pokemon.js";

export class PokemonResumido implements Pokemon {
    public id: number;
    public nome: string;
    public tipos: string[];
    public altura: number;
    public peso: number;

    constructor(id: number, nome: string, altura: number, peso: number, tipos: string[]) {
        this.id = id;
        this.nome = nome;
        this.altura = altura;
        this.peso = peso;
        this.tipos = tipos;
    }

    static fromApiResponse(apiResponse: PokemonApiResponse): PokemonResumido {
        const tipos = apiResponse.types.map((typeInfo: { type: { name: string } }) => typeInfo.type.name);
        return new PokemonResumido(apiResponse.id, apiResponse.name, apiResponse.height, apiResponse.weight, tipos);
    }

    apresentarPokemon(): string {
        const msg = [ "Pokémon Identificado!",
            `ID:  ${this.id}`,
            `Nome: ${this.nome}`,
            `Altura: ${this.altura}`,
            `Peso: ${this.peso}`,
            `Tipos: ${this.tipos.join(", ")}`];

        return msg.join("\n");
    }
}

