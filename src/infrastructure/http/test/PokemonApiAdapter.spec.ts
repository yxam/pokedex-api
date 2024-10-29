import { PokemonApiAdapter } from '../PokemonApiAdapter';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

describe('PokemonApiAdapter', () => {
  let adapter: PokemonApiAdapter;
  let httpService: HttpService;
  const pokemonApiUrl = 'url-api';
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonApiAdapter,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue(pokemonApiUrl),
          },
        },
      ],
    }).compile();

    adapter = module.get<PokemonApiAdapter>(PokemonApiAdapter);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should return data from pokemon API', async () => {
    const mockResponse = { data: { some: 'value' } };
    jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse) as any);
    const name = 'snorlax';
    const result = await adapter.fetchData(name);
    expect(result).toEqual(mockResponse.data);
    expect(httpService.get).toHaveBeenCalledWith(
      `${pokemonApiUrl}/pokemon/${name}`,
    );
  });
});
