import { IsIn, IsOptional, IsPositive, IsString } from 'class-validator';
import { IntersectionType } from '@nestjs/swagger';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  page?: number;

  @IsOptional()
  @IsPositive()
  pageSize?: number;
}

export class SortDto {
  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';
}

export class BaseQueryAllDto extends IntersectionType(
  PaginationDto,
  SortDto,
) {
  @IsOptional()
  @IsString()
  search?: string;
}
