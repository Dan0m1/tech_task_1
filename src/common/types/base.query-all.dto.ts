import { IsIn, IsOptional, IsPositive, IsString, Min } from 'class-validator';
import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';

export class PaginationDto {
  @ApiPropertyOptional({
    description: 'Page number',
    example: 0,
    minimum: 0,
  })
  @IsOptional()
  @Min(0)
  page?: number;

  @ApiPropertyOptional({
    description: 'Page size',
    example: 10,
    minimum: 1,
  })
  @IsOptional()
  @IsPositive()
  pageSize?: number;
}

export class SortDto {
  @ApiPropertyOptional({
    description: 'Field to sort by',
  })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({
    description: 'Sort order',
  })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';
}

export class BaseQueryAllDto extends IntersectionType(PaginationDto, SortDto) {
  @ApiPropertyOptional({
    description: 'Search string',
  })
  @IsOptional()
  @IsString()
  search?: string;
}
