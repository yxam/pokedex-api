import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from '../../../core/domain/pokemon.entity';

@Injectable()
export class PokemonRepository {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
  ) {}

  async create(pokemonData: Partial<Pokemon>): Promise<Pokemon> {
    const pokemon = this.pokemonRepository.create(pokemonData);
    return await this.pokemonRepository.save(pokemon);
  }

  async findBy(where: Partial<Pokemon>): Promise<Pokemon | undefined> {
    return await this.pokemonRepository.findOneBy(where);
  }
}
