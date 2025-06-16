import { IsDate, IsNumber, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({
    description: 'Event name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Event description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Event hosting date',
  })
  @IsDate()
  date: Date;

  @ApiProperty({
    description: 'Hosting location',
  })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'Maximum number of participants',
  })
  @IsNumber()
  @IsPositive()
  maxParticipants: number;
}
