import { IsDate, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDate()
  date: Date;

  @IsString()
  location: string;

  @IsNumber()
  @IsPositive()
  maxParticipants: number;
}
