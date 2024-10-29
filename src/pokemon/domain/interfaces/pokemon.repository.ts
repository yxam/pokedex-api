import { IPokemon } from './pokemon.entity';

export interface IPokemonRepository {
  create(pokemon: Partial<IPokemon>): Promise<IPokemon>;
  findBy(where: Partial<IPokemon>): Promise<IPokemon | null>;
}

export const IPokemonRepository = Symbol('IPokemonRepository');
