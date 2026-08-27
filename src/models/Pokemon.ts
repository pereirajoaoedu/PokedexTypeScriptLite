// Interfaces/Types e Classes de Entidade. Molde rigoroso dos atributos consumidos da API.

export class PokemonResumido {
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

    static fromApiResponse(apiResponse: any): PokemonResumido {
        const tipos = apiResponse.types.map((typeInfo: any) => typeInfo.type.name);
        return new PokemonResumido(apiResponse.id, apiResponse.name, apiResponse.height, apiResponse.weight, tipos);
    }
}

