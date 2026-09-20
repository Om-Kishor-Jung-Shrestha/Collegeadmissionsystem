import { Types } from "mongoose";

import {
  ApplicationResponseDto,
  CreateApplicationDto,
  ListApplicationsQueryDto,
} from "../dtos/application.dtos";

// import {
//   ApplicationStatus,
//   HigherEducationBoard,
//   IApplication,
// } from "../models/application.model";
import type {
  ApplicationStatus,
  IApplication,
} from "../models/application.model";

// ---------- Entity -> Response DTO ----------

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

  program: application.program.toString(),

  academicQualification:
    application.academicQualification,

  academicHistory: {
    collegeOrSchool:
      application.academicHistory.collegeOrSchool,

    board: application.academicHistory.board,

    gradeOrGpa:
      application.academicHistory.gradeOrGpa,
  },

  address: application.address,

  status: application.status,

  documents: {
    citizenship: {
      public_id:
        application.documents.citizenship.public_id,
      url: application.documents.citizenship.url,
      resourceType:
        application.documents.citizenship.resourceType,
      format:
        application.documents.citizenship.format,
    },

    cover: {
      public_id:
        application.documents.cover.public_id,
      url: application.documents.cover.url,
      resourceType:
        application.documents.cover.resourceType,
      format:
        application.documents.cover.format,
    },

    characterCertificate: {
      public_id:
        application.documents.characterCertificate
          .public_id,
      url:
        application.documents.characterCertificate.url,
      resourceType:
        application.documents.characterCertificate
          .resourceType,
      format:
        application.documents.characterCertificate
          .format,
    },

    document: {
      public_id:
        application.documents.document.public_id,
      url: application.documents.document.url,
      resourceType:
        application.documents.document.resourceType,
      format:
        application.documents.document.format,
    },

    marksheet12: {
      public_id:
        application.documents.marksheet12.public_id,
      url:
        application.documents.marksheet12.url,
      resourceType:
        application.documents.marksheet12.resourceType,
      format:
        application.documents.marksheet12.format,
    },
  },

  applicantImage: {
    public_id:
      application.applicantImage.public_id,
    url: application.applicantImage.url,
    resourceType:
      application.applicantImage.resourceType,
    format: application.applicantImage.format,
  },

  createdBy: application.createdBy
    ? application.createdBy.toString()
    : undefined,

  createdAt:
    application.createdAt.toISOString(),

  updatedAt:
    application.updatedAt.toISOString(),
});

// ---------- Paginated Response ----------

export interface PaginatedResponseDto<T> {
  data: T[];

  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const toPaginatedApplicationsDto = (
  items: IApplication[],
  total: number,
  page: number,
  limit: number
): PaginatedResponseDto<ApplicationResponseDto> => ({
  data: items.map(toApplicationResponseDto),

  meta: {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  },
});

// ---------- Create DTO -> Model Input ----------

export const toApplicationInput = (
  dto: CreateApplicationDto,
  createdBy?: string
): Partial<IApplication> => ({
  firstName: dto.firstName,
  middleName: dto.middleName,
  lastName: dto.lastName,

  email: dto.email,
  phone: dto.phone,

  program: new Types.ObjectId(dto.program),

  academicQualification:
    dto.academicQualification,

  academicHistory: {
    collegeOrSchool:
      dto.academicHistory.collegeOrSchool,

    board: dto.academicHistory.board,

    gradeOrGpa:
      dto.academicHistory.gradeOrGpa,
  },

  address: dto.address,

  ...(dto.status
    ? {
        status: dto.status,
      }
    : {}),

  ...(createdBy
    ? {
        createdBy: new Types.ObjectId(createdBy),
      }
    : {}),
});

// ---------- Mongo Filter ----------

export interface ApplicationFilter {
  program?: Types.ObjectId;
  status?: ApplicationStatus;

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
    filter.program = new Types.ObjectId(
      query.program
    );
  }

  if (query.status) {
    filter.status = query.status;
  }

  if (query.search) {
    const pattern = new RegExp(
      escapeRegex(query.search),
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