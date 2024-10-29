import { ApiProperty } from '@nestjs/swagger';

export class FindOrCreatePokemonResponseDto {
  @ApiProperty({ description: 'The id of pokemon', type: String })
  readonly id: number;
  @ApiProperty({ description: 'The name of pokemon', type: String })
  readonly name: string;
  @ApiProperty({ description: 'The height of pokemon', type: String })
  readonly height: string;
  @ApiProperty({ description: 'The weight of pokemon', type: String })
  readonly weight: string;
  @ApiProperty({ description: 'The baseExperience of pokemon', type: String })
  readonly baseExperience: string;
}
