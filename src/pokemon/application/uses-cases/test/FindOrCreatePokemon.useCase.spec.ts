import { IPokemonRepository } from '../../../../pokemon/domain/interfaces/pokemon.repository';
import { FindOrCreatePokemonUseCase } from '../FindOrCreatePokemon.useCase';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { GetPokemonDataUseCase } from '../../../../core/application/use-cases/GetPokemonDataUseCase';

describe('FindOrCreatePokemonUseCase', () => {
  let useCase: FindOrCreatePokemonUseCase;
  let mockIPokemonRepository: jest.Mocked<IPokemonRepository>;
  let mockGetPokemonDataUseCase: jest.Mocked<GetPokemonDataUseCase>;
  const mockApiPokemonResponse = {
    height: 1,
    weight: 1,
    base_experience: 1,
    name: 'snorlax',
  };
  const mockPokemon = {
    id: 1,
    name: mockApiPokemonResponse.name,
    height: mockApiPokemonResponse.height,
    weight: mockApiPokemonResponse.weight,
    baseExperience: mockApiPokemonResponse.base_experience,
  };
  beforeEach(() => {
    mockIPokemonRepository = {
      findBy: jest.fn(),
      create: jest.fn(),
    };
    mockGetPokemonDataUseCase = {
      execute: jest.fn(),
      logger: new Logger(),
    } as unknown as jest.Mocked<GetPokemonDataUseCase>;
    useCase = new FindOrCreatePokemonUseCase(
      mockIPokemonRepository,
      mockGetPokemonDataUseCase,
    );
  });

  it('Should return the pokemon data when already exists', async () => {
    mockIPokemonRepository.findBy.mockResolvedValue(mockPokemon);
    const result = await useCase.execute({ name: mockPokemon.name });

    expect(result).toEqual(mockPokemon);
    expect(mockIPokemonRepository.findBy).toHaveBeenCalledWith({
      name: mockPokemon.name,
    });
    expect(mockGetPokemonDataUseCase.execute).not.toHaveBeenCalled();
  });

  it('Should create and return the new pokemon data', async () => {
    mockIPokemonRepository.findBy.mockResolvedValue(null);
    mockIPokemonRepository.create.mockResolvedValue(mockPokemon);
    mockGetPokemonDataUseCase.execute.mockResolvedValue(mockApiPokemonResponse);
    const result = await useCase.execute({ name: mockPokemon.name });

    expect(result).toBe(mockPokemon);
    expect(mockIPokemonRepository.findBy).toHaveBeenCalledWith({
      name: mockPokemon.name,
    });
    expect(mockGetPokemonDataUseCase.execute).toHaveBeenCalledWith({
      name: mockPokemon.name,
    });
  });

  it('Should fail to fetch data', async () => {
    mockIPokemonRepository.findBy.mockRejectedValue(new Error('some error'));
    let err;
    try {
      await useCase.execute({ name: 'example' });
    } catch (error) {
      err = error;
    } finally {
      expect(err instanceof InternalServerErrorException).toBeTruthy();
    }
    expect.assertions(1);
  });
});
