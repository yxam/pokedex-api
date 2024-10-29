import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class FindOrCreatePokemonDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'ditto',
    description: 'The name of pokemon',
    type: String,
  })
  readonly name: string;
}
