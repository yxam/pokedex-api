import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { FindOrCreatePokemonDto } from '../application/dtos';
import { FindOrCreatePokemonUseCase } from '../application/uses-cases/FindOrCreatePokemon.useCase';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindOrCreatePokemonResponseDto } from '../application/dtos/find-or-create-pokemon-response.dto';
import { ErrorResponseDto } from 'src/core/application/dtos/error-response.dto';

@ApiTags('Pokemon')
@Controller('pokemon')
export class PokemonController {
  constructor(
    private readonly findOrCreatePokemonUseCase: FindOrCreatePokemonUseCase
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ type: FindOrCreatePokemonResponseDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: FindOrCreatePokemonResponseDto,
    description: 'Created',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ErrorResponseDto,
    description: 'Pokemon not found',
  })
  findOrCreate(@Body() dto: FindOrCreatePokemonDto) {
    return this.findOrCreatePokemonUseCase.execute(dto);
  }
}
