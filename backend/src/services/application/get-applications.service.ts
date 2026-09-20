// import ApplicationModel from "../../models/application.model";

// import {
//   toApplicationFilter,
//   toApplicationResponseDto,
// } from "../../mapper/applicaiton.mapper";

// import type { ListApplicationsQueryDto } from "../../dtos/application.dtos";

// import type {
//   PaginatedResponseDto,
//   PaginationMeta,
// } from "../../dtos/pagination-response.dtos";

// export async function getApplicationsService(
//   query: ListApplicationsQueryDto
// ): Promise<
//   PaginatedResponseDto<
//     ReturnType<typeof toApplicationResponseDto>
//   >
// > {
//   const {
//     page = 1,
//     limit = 10,
//     sortBy = "createdAt",
//     sortOrder = "desc",
//   } = query;

//   const filter =
//     toApplicationFilter(query);

//   const allowedSortFields = [
//     "firstName",
//     "lastName",
//     "email",
//     "phone",
//     "status",
//     "admissionSession",
//     "admissionIntake",
//     "createdAt",
//     "updatedAt",
//   ];

//   const safeSortBy =
//     allowedSortFields.includes(sortBy)
//       ? sortBy
//       : "createdAt";

//   const sort: Record<
//     string,
//     1 | -1
//   > = {
//     [safeSortBy]:
//       sortOrder === "desc"
//         ? -1
//         : 1,
//   };

//   const skip = (page - 1) * limit;

//   const [
//     applications,
//     totalItems,
//   ] = await Promise.all([
//     ApplicationModel.find(filter)
//       .sort(sort)
//       .skip(skip)
//       .limit(limit),

//     ApplicationModel.countDocuments(
//       filter
//     ),
//   ]);

//   const totalPages = Math.ceil(
//     totalItems / limit
//   );

//   const pagination: PaginationMeta = {
//     page,
//     limit,
//     totalItems,
//     totalPages,
//     hasNextPage:
//       page < totalPages,
//     hasPreviousPage:
//       page > 1,
//   };

//   return {
//     items: applications.map(
//       toApplicationResponseDto
//     ),

//     pagination,
//   };
// }


import ApplicationModel from "../../models/application.model";

import {
  toApplicationFilter,
  toPaginatedApplicationsDto,
} from "../../mapper/applicaiton.mapper";


import type {
  ListApplicationsQueryDto,
} from "../../dtos/application.dtos";

export async function getApplicationsService(
  query: ListApplicationsQueryDto
): Promise<
  ReturnType<
    typeof toPaginatedApplicationsDto
  >
> {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = query;

  const filter =
    toApplicationFilter(query);

  const allowedSortFields = [
    "createdAt",
    "updatedAt",
    "firstName",
    "lastName",
    "email",
    "status",
    "admissionSession",
    "admissionIntake",
  ];

  const safeSortBy =
    allowedSortFields.includes(
      sortBy
    )
      ? sortBy
      : "createdAt";

  const sort: Record<
    string,
    1 | -1
  > = {
    [safeSortBy]:
      sortOrder === "desc"
        ? -1
        : 1,
  };

  const skip =
    (page - 1) * limit;

  const [
    applications,
    total,
  ] = await Promise.all([
    ApplicationModel.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit),

    ApplicationModel.countDocuments(
      filter
    ),
  ]);

  return toPaginatedApplicationsDto(
    applications,
    total,
    page,
    limit
  );
}