import { Module } from '@nestjs/common';
import { PokemonController } from './infrastructure/pokemon.controller';
import { FindOrCreatePokemonUseCase } from './application/uses-cases/FindOrCreatePokemon.useCase';
import { PostgresModule } from '../infrastructure/database/postgres/postgres.module';
import { PokemonRepository } from '../infrastructure/database/postgres/pokemon.repository';
import { PokemonApiAdapter } from '../infrastructure/http/PokemonApiAdapter';
import { GetPokemonDataUseCase } from '../core/application/use-cases/GetPokemonDataUseCase';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PostgresModule, HttpModule],
  controllers: [PokemonController],
  providers: [
    FindOrCreatePokemonUseCase,
    GetPokemonDataUseCase,
    { provide: 'IPokemonRepository', useClass: PokemonRepository },
    {
      provide: 'PokemonApiPort',
      useClass: PokemonApiAdapter,
    },
  ],
})
export class PokemonModule {}
