import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { FindOrCreatePokemonDto } from '../application/dtos';
import { FindOrCreatePokemonUseCase } from '../application/uses-cases/FindOrCreatePokemon.useCase';
import { ApiResponse } from '@nestjs/swagger';
import { FindOrCreatePokemonResponseDto } from '../application/dtos/find-or-create-pokemon-response.dto';

@Controller('pokemons')
export class PokemonController {
  constructor(
    private readonly findOrCreatePokemonUseCase: FindOrCreatePokemonUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ type: FindOrCreatePokemonResponseDto })
  findOrCreate(@Body() dto: FindOrCreatePokemonDto) {
    return this.findOrCreatePokemonUseCase.execute(dto);
  }
}
