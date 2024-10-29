import { ApiProperty } from '@nestjs/swagger';

export class FindOrCreatePokemonDto {
  @ApiProperty({ description: 'The name of pokemon', type: String })
  readonly name: string;
}
