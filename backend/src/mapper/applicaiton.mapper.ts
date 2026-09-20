// import { Types } from "mongoose";

// import type {
//   ApplicationResponseDto,
//   CreateApplicationDto,
//   ListApplicationsQueryDto,
//   UpdateApplicationDto,
// } from "../dtos/application.dtos";

// import type {
//   ApplicationStatus,
//   IApplication,
// } from "../models/application.model";

// /*
// |--------------------------------------------------------------------------
// | Entity -> Response DTO
// |--------------------------------------------------------------------------
// */

// export const toApplicationResponseDto = (
//   application: IApplication
// ): ApplicationResponseDto => ({
//   id: application._id.toString(),

//   firstName: application.firstName,
//   middleName:
//     application.middleName || undefined,
//   lastName: application.lastName,

//   email: application.email,
//   phone: application.phone,

//   program: application.program.toString(),

//   admissionSession:
//     application.admissionSession,

//   admissionIntake:
//     application.admissionIntake,

//   academicQualification:
//     application.academicQualification,

//   academicHistory: {
//     collegeOrSchool:
//       application.academicHistory.collegeOrSchool,

//     board: application.academicHistory.board,

//     gradeOrGpa:
//       application.academicHistory.gradeOrGpa,
//   },

//   address: application.address,

//   status: application.status,

//   documents: {
//     citizenship: {
//       public_id:
//         application.documents.citizenship.public_id,
//       url:
//         application.documents.citizenship.url,
//       resourceType:
//         application.documents.citizenship.resourceType,
//       format:
//         application.documents.citizenship.format,
//     },

//     cover: {
//       public_id:
//         application.documents.cover.public_id,
//       url:
//         application.documents.cover.url,
//       resourceType:
//         application.documents.cover.resourceType,
//       format:
//         application.documents.cover.format,
//     },

//     characterCertificate: {
//       public_id:
//         application.documents.characterCertificate.public_id,
//       url:
//         application.documents.characterCertificate.url,
//       resourceType:
//         application.documents.characterCertificate.resourceType,
//       format:
//         application.documents.characterCertificate.format,
//     },

//     document: {
//       public_id:
//         application.documents.document.public_id,
//       url:
//         application.documents.document.url,
//       resourceType:
//         application.documents.document.resourceType,
//       format:
//         application.documents.document.format,
//     },

//     marksheet12: {
//       public_id:
//         application.documents.marksheet12.public_id,
//       url:
//         application.documents.marksheet12.url,
//       resourceType:
//         application.documents.marksheet12.resourceType,
//       format:
//         application.documents.marksheet12.format,
//     },
//   },

//   applicantImage: {
//     public_id:
//       application.applicantImage.public_id,
//     url:
//       application.applicantImage.url,
//     resourceType:
//       application.applicantImage.resourceType,
//     format:
//       application.applicantImage.format,
//   },

//   createdBy: application.createdBy
//     ? application.createdBy.toString()
//     : undefined,

//   createdAt:
//     application.createdAt.toISOString(),

//   updatedAt:
//     application.updatedAt.toISOString(),
// });

// /*
// |--------------------------------------------------------------------------
// | Create DTO -> Model Input
// |--------------------------------------------------------------------------
// */

// export const toApplicationInput = (
//   dto: CreateApplicationDto,
//   createdBy?: string
// ): Partial<IApplication> => ({
//   firstName: dto.firstName.trim(),

//   middleName:
//     dto.middleName?.trim() ?? "",

//   lastName: dto.lastName.trim(),

//   email: dto.email.trim().toLowerCase(),

//   phone: dto.phone.trim(),

//   program: new Types.ObjectId(dto.program),

//   admissionSession:
//     dto.admissionSession.trim(),

//   admissionIntake:
//     dto.admissionIntake,

//   academicQualification:
//     dto.academicQualification.trim(),

//   academicHistory: {
//     collegeOrSchool:
//       dto.academicHistory.collegeOrSchool.trim(),

//     board: dto.academicHistory.board,

//     gradeOrGpa:
//       dto.academicHistory.gradeOrGpa.trim(),
//   },

//   address: dto.address.trim(),

//   documents: {
//     citizenship: {
//       public_id:
//         dto.documents.citizenship.public_id,
//       url:
//         dto.documents.citizenship.url,
//       resourceType:
//         dto.documents.citizenship.resourceType,
//       format:
//         dto.documents.citizenship.format,
//     },

//     cover: {
//       public_id:
//         dto.documents.cover.public_id,
//       url:
//         dto.documents.cover.url,
//       resourceType:
//         dto.documents.cover.resourceType,
//       format:
//         dto.documents.cover.format,
//     },

//     characterCertificate: {
//       public_id:
//         dto.documents.characterCertificate.public_id,
//       url:
//         dto.documents.characterCertificate.url,
//       resourceType:
//         dto.documents.characterCertificate.resourceType,
//       format:
//         dto.documents.characterCertificate.format,
//     },

//     document: {
//       public_id:
//         dto.documents.document.public_id,
//       url:
//         dto.documents.document.url,
//       resourceType:
//         dto.documents.document.resourceType,
//       format:
//         dto.documents.document.format,
//     },

//     marksheet12: {
//       public_id:
//         dto.documents.marksheet12.public_id,
//       url:
//         dto.documents.marksheet12.url,
//       resourceType:
//         dto.documents.marksheet12.resourceType,
//       format:
//         dto.documents.marksheet12.format,
//     },
//   },

//   applicantImage: {
//     public_id:
//       dto.applicantImage.public_id,
//     url:
//       dto.applicantImage.url,
//     resourceType:
//       dto.applicantImage.resourceType,
//     format:
//       dto.applicantImage.format,
//   },

//   ...(dto.status
//     ? {
//         status: dto.status,
//       }
//     : {}),

//   ...(createdBy
//     ? {
//         createdBy:
//           new Types.ObjectId(createdBy),
//       }
//     : {}),
// });

// /*
// |--------------------------------------------------------------------------
// | Update DTO -> Model Update
// |--------------------------------------------------------------------------
// */

// export const toApplicationUpdate = (
//   dto: UpdateApplicationDto
// ): Partial<IApplication> => {
//   const update: Partial<IApplication> = {};

//   if (dto.firstName !== undefined) {
//     update.firstName = dto.firstName.trim();
//   }

//   if (dto.middleName !== undefined) {
//     update.middleName = dto.middleName.trim();
//   }

//   if (dto.lastName !== undefined) {
//     update.lastName = dto.lastName.trim();
//   }

//   if (dto.email !== undefined) {
//     update.email = dto.email.trim().toLowerCase();
//   }

//   if (dto.phone !== undefined) {
//     update.phone = dto.phone.trim();
//   }

//   if (dto.program !== undefined) {
//     update.program =
//       new Types.ObjectId(dto.program);
//   }

//   if (dto.admissionSession !== undefined) {
//     update.admissionSession =
//       dto.admissionSession.trim();
//   }

//   if (dto.admissionIntake !== undefined) {
//     update.admissionIntake =
//       dto.admissionIntake;
//   }

//   if (
//     dto.academicQualification !==
//     undefined
//   ) {
//     update.academicQualification =
//       dto.academicQualification.trim();
//   }

//   if (dto.academicHistory !== undefined) {
//     update.academicHistory = {
//       collegeOrSchool:
//         dto.academicHistory.collegeOrSchool.trim(),

//       board:
//         dto.academicHistory.board,

//       gradeOrGpa:
//         dto.academicHistory.gradeOrGpa.trim(),
//     };
//   }

//   if (dto.address !== undefined) {
//     update.address = dto.address.trim();
//   }

//   if (dto.documents !== undefined) {
//     update.documents = {
//       citizenship: {
//         public_id:
//           dto.documents.citizenship.public_id,
//         url:
//           dto.documents.citizenship.url,
//         resourceType:
//           dto.documents.citizenship.resourceType,
//         format:
//           dto.documents.citizenship.format,
//       },

//       cover: {
//         public_id:
//           dto.documents.cover.public_id,
//         url:
//           dto.documents.cover.url,
//         resourceType:
//           dto.documents.cover.resourceType,
//         format:
//           dto.documents.cover.format,
//       },

//       characterCertificate: {
//         public_id:
//           dto.documents.characterCertificate.public_id,
//         url:
//           dto.documents.characterCertificate.url,
//         resourceType:
//           dto.documents.characterCertificate.resourceType,
//         format:
//           dto.documents.characterCertificate.format,
//       },

//       document: {
//         public_id:
//           dto.documents.document.public_id,
//         url:
//           dto.documents.document.url,
//         resourceType:
//           dto.documents.document.resourceType,
//         format:
//           dto.documents.document.format,
//       },

//       marksheet12: {
//         public_id:
//           dto.documents.marksheet12.public_id,
//         url:
//           dto.documents.marksheet12.url,
//         resourceType:
//           dto.documents.marksheet12.resourceType,
//         format:
//           dto.documents.marksheet12.format,
//       },
//     };
//   }

//   if (dto.applicantImage !== undefined) {
//     update.applicantImage = {
//       public_id:
//         dto.applicantImage.public_id,

//       url:
//         dto.applicantImage.url,

//       resourceType:
//         dto.applicantImage.resourceType,

//       format:
//         dto.applicantImage.format,
//     };
//   }

//   if (dto.status !== undefined) {
//     update.status = dto.status;
//   }

//   return update;
// };

// /*
// |--------------------------------------------------------------------------
// | Mongo Filter
// |--------------------------------------------------------------------------
// */

// export interface ApplicationFilter {
//   program?: Types.ObjectId;

//   status?: ApplicationStatus;

//   admissionSession?: string;

//   admissionIntake?:
//     IApplication["admissionIntake"];

//   $or?: Array<
//     Record<string, RegExp>
//   >;
// }

// export const escapeRegex = (
//   value: string
// ): string =>
//   value.replace(
//     /[.*+?^${}()|[\]\\]/g,
//     String.raw`\$&`
//   );

// export const toApplicationFilter = (
//   query: ListApplicationsQueryDto
// ): ApplicationFilter => {
//   const filter: ApplicationFilter = {};

//   if (query.program) {
//     filter.program =
//       new Types.ObjectId(query.program);
//   }

//   if (query.status) {
//     filter.status = query.status;
//   }

//   if (query.admissionSession) {
//     filter.admissionSession =
//       query.admissionSession.trim();
//   }

//   if (query.admissionIntake) {
//     filter.admissionIntake =
//       query.admissionIntake;
//   }

//   if (query.search?.trim()) {
//     const pattern = new RegExp(
//       escapeRegex(query.search.trim()),
//       "i"
//     );

//     filter.$or = [
//       {
//         firstName: pattern,
//       },
//       {
//         middleName: pattern,
//       },
//       {
//         lastName: pattern,
//       },
//       {
//         email: pattern,
//       },
//       {
//         phone: pattern,
//       },
//     ];
//   }

//   return filter;
// };

import { Types } from "mongoose";

import type {
  ApplicationResponseDto,
  CreateApplicationDto,
  ListApplicationsQueryDto,
} from "../dtos/application.dtos";

import type {
  ApplicationStatus,
  ApplicationIntake,
  IApplication,
} from "../models/application.model";

export const toApplicationFileDto = (
  file: IApplication["documents"]["citizenship"]
): ApplicationResponseDto["documents"]["citizenship"] => ({
  storage: file.storage,
  public_id: file.public_id,
  url: file.url,
  ...(file.path ? { path: file.path } : {}),
  resourceType: file.resourceType,
  format: file.format,
});

export const toApplicantImageDto = (
  file: IApplication["applicantImage"]
): ApplicationResponseDto["applicantImage"] => ({
  storage: file.storage,
  public_id: file.public_id,
  url: file.url,
  ...(file.path ? { path: file.path } : {}),
  resourceType: file.resourceType,
  format: file.format,
});

export const toApplicationResponseDto = (
  application: IApplication
): ApplicationResponseDto => ({
  id: application._id.toString(),

  firstName: application.firstName,

  middleName:
    application.middleName || undefined,

  lastName: application.lastName,

  email: application.email,

  phone: application.phone,

  program:
    application.program.toString(),

  admissionSession:
    application.admissionSession,

  admissionIntake:
    application.admissionIntake,

  academicQualification:
    application.academicQualification,

  academicHistory: {
    collegeOrSchool:
      application.academicHistory
        .collegeOrSchool,

    board:
      application.academicHistory.board,

    gradeOrGpa:
      application.academicHistory.gradeOrGpa,
  },

  address:
    application.address,

  status:
    application.status,

  documents: {
    citizenship:
      toApplicationFileDto(
        application.documents.citizenship
      ),

    cover:
      toApplicationFileDto(
        application.documents.cover
      ),

    characterCertificate:
      toApplicationFileDto(
        application.documents
          .characterCertificate
      ),

    document:
      toApplicationFileDto(
        application.documents.document
      ),

    marksheet12:
      toApplicationFileDto(
        application.documents.marksheet12
      ),
  },

  applicantImage:
    toApplicantImageDto(
      application.applicantImage
    ),

  createdBy:
    application.createdBy
      ? application.createdBy.toString()
      : undefined,

  createdAt:
    application.createdAt.toISOString(),

  updatedAt:
    application.updatedAt.toISOString(),
});

export interface PaginatedApplicationsResponseDto {
  data: ApplicationResponseDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export const toPaginatedApplicationsDto = (
  items: IApplication[],
  total: number,
  page: number,
  limit: number
): PaginatedApplicationsResponseDto => {
  const totalPages =
    Math.ceil(total / limit);

  return {
    data: items.map(
      toApplicationResponseDto
    ),

    meta: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage:
        page < totalPages,
      hasPreviousPage:
        page > 1,
    },
  };
};

export const toApplicationInput = (
  dto: CreateApplicationDto,
  createdBy?: string
): Partial<IApplication> => ({
  firstName: dto.firstName,

  middleName:
    dto.middleName,

  lastName: dto.lastName,

  email: dto.email,

  phone: dto.phone,

  program:
    new Types.ObjectId(dto.program),

  admissionSession:
    dto.admissionSession,

  admissionIntake:
    dto.admissionIntake,

  academicQualification:
    dto.academicQualification,

  academicHistory: {
    collegeOrSchool:
      dto.academicHistory
        .collegeOrSchool,

    board:
      dto.academicHistory.board,

    gradeOrGpa:
      dto.academicHistory.gradeOrGpa,
  },

  address:
    dto.address,

  ...(dto.status
    ? {
        status: dto.status,
      }
    : {}),

  ...(createdBy
    ? {
        createdBy:
          new Types.ObjectId(
            createdBy
          ),
      }
    : {}),
});

export interface ApplicationFilter {
  program?: Types.ObjectId;
  status?: ApplicationStatus;
  admissionSession?: string;
  admissionIntake?: ApplicationIntake;
  $or?: Array<
    Record<string, RegExp>
  >;
}

export const escapeRegex = (
  value: string
): string =>
  value.replace(
    /[.*+?^${}()|[\]\\]/g,
    String.raw`\$&`
  );

export const toApplicationFilter = (
  query: ListApplicationsQueryDto
): ApplicationFilter => {
  const filter: ApplicationFilter = {};

  if (query.program) {
    filter.program =
      new Types.ObjectId(
        query.program
      );
  }

  if (query.status) {
    filter.status =
      query.status;
  }

  if (query.admissionSession) {
    filter.admissionSession =
      query.admissionSession;
  }

  if (query.admissionIntake) {
    filter.admissionIntake =
      query.admissionIntake;
  }

  if (query.search?.trim()) {
    const pattern = new RegExp(
      escapeRegex(
        query.search.trim()
      ),
      "i"
    );

    filter.$or = [
      {
        firstName: pattern,
      },
      {
        middleName: pattern,
      },
      {
        lastName: pattern,
      },
      {
        email: pattern,
      },
      {
        phone: pattern,
      },
    ];
  }

  return filter;
};