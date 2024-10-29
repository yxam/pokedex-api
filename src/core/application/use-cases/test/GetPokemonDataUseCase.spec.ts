import { GetPokemonDataUseCase } from '../GetPokemonDataUseCase';
import { PokemonApiPort } from '../../../domain/ports/PokemonApiPort';
import { InternalServerErrorException } from '@nestjs/common';

describe('GetPokemonDataUseCase', () => {
  let useCase: GetPokemonDataUseCase;
  let mockPokemonApiPort: jest.Mocked<PokemonApiPort>;
  const pokemonName = 'snorlax';
  beforeEach(() => {
    mockPokemonApiPort = {
      fetchData: jest.fn(),
    };

    useCase = new GetPokemonDataUseCase(mockPokemonApiPort);
  });

  it('Should return the pokemon data', async () => {
    const mockResponse = { data: { height: 1, weight: 1, base_experience: 1 } };
    mockPokemonApiPort.fetchData.mockResolvedValue(mockResponse);
    const result = await useCase.execute({ name: pokemonName });

    expect(result).toEqual(mockResponse);
    expect(mockPokemonApiPort.fetchData).toHaveBeenCalledWith(pokemonName);
  });

  it('Should fail to fetch data', async () => {
    mockPokemonApiPort.fetchData.mockRejectedValue(new Error('some error'));
    let err;
    try {
      await useCase.execute({ name: pokemonName });
    } catch (error) {
      err = error;
    } finally {
      expect(err instanceof InternalServerErrorException).toBeTruthy();
    }
    expect.assertions(1);
  });
});
