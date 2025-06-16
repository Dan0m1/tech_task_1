import { PaginationDto, SortDto } from '../common/types/base.query-all.dto';

export class DatabaseUtils {
  static buildFindManyArgs<WhereInput>({
    modelSpecificFilters,
    sortDto,
    defaultSortField = 'id',
    paginationDto,
    searchableFields,
    search,
  }: {
    modelSpecificFilters?: Record<string, any>;
    sortDto?: SortDto;
    defaultSortField: string;
    paginationDto?: PaginationDto;
    searchableFields?: string[];
    search?: string;
  }): {
    where: WhereInput;
    skip?: number;
    take?: number;
    orderBy?: {
      [key: string]: 'asc' | 'desc';
    }[];
  } {
    let where: WhereInput = {} as WhereInput;

    if (search && searchableFields?.length) {
      where = {
        OR: searchableFields.map((field) => ({
          [field]: {
            contains: search,
          },
        })),
      } as WhereInput;
    }

    if (modelSpecificFilters) {
      for (const [key, value] of Object.entries(modelSpecificFilters)) {
        if (value) {
          where[key] = value;
        }
      }
    }

    let args: any = { where };
    if (sortDto) {
      args = {
        ...args,
        ...DatabaseUtils.getSortArgs(sortDto, defaultSortField),
      };
    }
    if (paginationDto) {
      args = {
        ...args,
        ...DatabaseUtils.getPaginationArgs(paginationDto),
      };
    }

    return args;
  }

  static getPaginationArgs({ page = 0, pageSize = 20 }: PaginationDto) {
    page = +page;
    pageSize = +pageSize;
    if (!pageSize) return;
    if (page === 0) {
      return {
        skip: 0,
        take: pageSize * 2,
      };
    }
    return {
      skip: (page - 1) * pageSize,
      take: pageSize * 3,
    };
  }

  static convertPaginationData(
    result: any,
    totalAmount: number,
    { page, pageSize }: PaginationDto,
  ) {
    page = page ? +page : 0;
    pageSize = pageSize ? +pageSize : 0;

    const pages = Math.ceil(result.length / pageSize);
    const totalPages = pageSize !== 0 ? Math.ceil(totalAmount / pageSize) : 0;

    if (!pageSize || pages === 1) {
      return {
        data: result,
        meta: {
          amount: result.length,
          totalAmount,
          totalPages,
          pageSize: +pageSize,
          page: +page,
          prevPageSize: 0,
          nextPageSize: 0,
        },
      };
    }
    if (page === 0) {
      const data = result.slice(0, pageSize);
      return {
        data,
        meta: {
          amount: data.length,
          totalAmount,
          totalPages,
          pageSize,
          page,
          prevPageSize: 0,
          nextPageSize: data.slice(pageSize).length,
        },
      };
    } else if (pages === 2) {
      const data = result.slice(pageSize);
      return {
        data,
        meta: {
          amount: data.length,
          totalAmount,
          totalPages,
          pageSize,
          page,
          prevPageSize: data.slice(0, pageSize).length,
          nextPageSize: 0,
        },
      };
    }
    const data = result.slice(pageSize, pageSize * 2);
    return {
      data,
      meta: {
        amount: data.length,
        totalAmount,
        totalPages,
        pageSize,
        page,
        prevPageSize: data.slice(0, pageSize).length,
        nextPageSize: data.slice(pageSize * 2).length,
      },
    };
  }

  static getSortArgs(
    { sortBy, sortOrder = 'asc' }: SortDto,
    standardField: string,
  ) {
    if (!sortBy)
      return {
        orderBy: [
          {
            [standardField]: sortOrder,
          },
        ],
      };
    return {
      orderBy: [
        {
          [sortBy]: sortOrder,
        },
      ],
    };
  }
}
