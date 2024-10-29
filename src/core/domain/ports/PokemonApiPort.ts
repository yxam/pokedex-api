export interface PokemonApiPort {
  fetchData(param: string): Promise<any>;
}
