export interface PokemonApiResponse {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: {
        type: {
          name: string;
        };
  }[];
}