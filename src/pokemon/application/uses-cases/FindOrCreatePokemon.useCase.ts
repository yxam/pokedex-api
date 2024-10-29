import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { IPokemonRepository } from '../../domain/interfaces/pokemon.repository';
import { IPokemon } from '../../domain/interfaces/pokemon.entity';
import { FindOrCreatePokemonDto } from '../dtos';
import { GetPokemonDataUseCase } from '../../../core/application/use-cases/GetPokemonDataUseCase';

@Injectable()
export class FindOrCreatePokemonUseCase {
  private logger = new Logger('FindOrCreatePokemonUseCase');
  constructor(
    @Inject('IPokemonRepository')
    private readonly pokemonRepository: IPokemonRepository,
    private readonly getPokemonDataUseCase: GetPokemonDataUseCase,
  ) {}

  async execute(dto: FindOrCreatePokemonDto): Promise<IPokemon> {
    try {
      const { name } = dto;
      const pokemon = await this.pokemonRepository.findBy({ name });
      if (pokemon) {
        return pokemon;
      }
      return this.createNewPokemonByName(name);
    } catch (error) {
      this.logger.error({ message: JSON.stringify(error) });
      throw new InternalServerErrorException();
    }
  }

  private async createNewPokemonByName(name: string): Promise<IPokemon> {
    const pokemonData = await this.getPokemonDataUseCase.execute({ name });
    const { height, weight, base_experience: baseExperience } = pokemonData;
    const newPokemon: Partial<IPokemon> = {
      name,
      height,
      weight,
      baseExperience,
    };
    return this.pokemonRepository.create(newPokemon);
  }
}
