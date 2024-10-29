import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PokemonApiPort } from '../../domain/ports/PokemonApiPort';
import { GetPokemonDataDto } from '../dtos/get-pokemon-data.dto';

@Injectable()
export class GetPokemonDataUseCase {
  private readonly logger = new Logger('GetPokemonDataUseCase');
  constructor(
    @Inject('PokemonApiPort')
    private readonly pokemonApiPort: PokemonApiPort,
  ) {}

  async execute(dto: GetPokemonDataDto): Promise<any> {
    try {
      const { name } = dto;
      const data = await this.pokemonApiPort.fetchData(name);
      return data;
    } catch (error) {
      this.logger.error({ message: JSON.stringify(error) });
      throw new InternalServerErrorException(error);
    }
  }
}
