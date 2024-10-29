import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  code: number;
}
