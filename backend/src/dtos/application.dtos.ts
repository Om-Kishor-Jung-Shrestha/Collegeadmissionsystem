import {
  IsEmail,
  IsEnum,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

import {
  APPLICATION_STATUSES,
  HIGHER_EDUCATION_BOARDS,
  ApplicationStatus,
  HigherEducationBoard,
} from "../models/application.model";

export class AcademicHistoryDto {
  @IsString()
  @IsNotEmpty({
    message: "College or school name is required",
  })
  @MinLength(2, {
    message:
      "College or school name must be at least 2 characters",
  })
  @MaxLength(200, {
    message:
      "College or school name cannot exceed 200 characters",
  })
  collegeOrSchool!: string;

  @IsEnum(HIGHER_EDUCATION_BOARDS, {
    message: "Invalid higher education board",
  })
  board!: HigherEducationBoard;

  @IsString()
  @IsNotEmpty({
    message: "Grade or GPA is required",
  })
  @MaxLength(20, {
    message: "Grade or GPA cannot exceed 20 characters",
  })
  gradeOrGpa!: string;
}

// ---------- Create Application ----------

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty({
    message: "First name is required",
  })
  @MinLength(2, {
    message: "First name must be at least 2 characters",
  })
  @MaxLength(50, {
    message: "First name cannot exceed 50 characters",
  })
  firstName!: string;

  @IsOptional()
  @IsString()
  @MaxLength(50, {
    message: "Middle name cannot exceed 50 characters",
  })
  middleName?: string;

  @IsString()
  @IsNotEmpty({
    message: "Last name is required",
  })
  @MinLength(2, {
    message: "Last name must be at least 2 characters",
  })
  @MaxLength(50, {
    message: "Last name cannot exceed 50 characters",
  })
  lastName!: string;

  @IsEmail(
    {},
    {
      message: "Invalid email address",
    }
  )
  email!: string;

  @IsString()
  @IsNotEmpty({
    message: "Phone number is required",
  })
  @Matches(/^\+?[0-9\s\-()]{7,20}$/, {
    message: "Invalid phone number",
  })
  phone!: string;

  @IsMongoId({
    message: "Invalid program ID",
  })
  program!: string;

  @IsString()
  @IsNotEmpty({
    message: "Academic qualification is required",
  })
  @MinLength(2, {
    message:
      "Academic qualification must be at least 2 characters",
  })
  @MaxLength(200, {
    message:
      "Academic qualification cannot exceed 200 characters",
  })
  academicQualification!: string;

  academicHistory!: AcademicHistoryDto;

  @IsString()
  @IsNotEmpty({
    message: "Address is required",
  })
  @MinLength(5, {
    message: "Address must be at least 5 characters",
  })
  @MaxLength(300, {
    message: "Address cannot exceed 300 characters",
  })
  address!: string;

  @IsEnum(APPLICATION_STATUSES, {
    message: "Invalid application status",
  })
  @IsOptional()
  status?: ApplicationStatus;
}

// ---------- Full Application Update ----------

export class UpdateApplicationDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  middleName?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName?: string;

  @IsOptional()
  @IsEmail(
    {},
    {
      message: "Invalid email address",
    }
  )
  email?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+?[0-9\s\-()]{7,20}$/, {
    message: "Invalid phone number",
  })
  phone?: string;

  @IsOptional()
  @IsMongoId({
    message: "Invalid program ID",
  })
  program?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  academicQualification?: string;

  @IsOptional()
  academicHistory?: AcademicHistoryDto;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(300)
  address?: string;

  @IsOptional()
  @IsEnum(APPLICATION_STATUSES, {
    message: "Invalid application status",
  })
  status?: ApplicationStatus;
}

// ---------- Status-only Update ----------

export class UpdateStatusDto {
  @IsEnum(APPLICATION_STATUSES, {
    message: "Invalid application status",
  })
  status!: ApplicationStatus;
}

// ---------- List Applications Query ----------

export class ListApplicationsQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsMongoId({
    message: "Invalid program ID",
  })
  program?: string;

  @IsOptional()
  @IsEnum(APPLICATION_STATUSES, {
    message: "Invalid application status",
  })
  status?: ApplicationStatus;

  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;
}

// ---------- Application ID ----------

export class ApplicationIdParamDto {
  @IsMongoId({
    message: "Invalid application ID",
  })
  id!: string;
}

// ---------- Response DTOs ----------

export interface ApplicationResponseDto {
  id: string;

  firstName: string;
  middleName?: string;
  lastName: string;

  email: string;
  phone: string;

  program: string;

  academicQualification: string;

  academicHistory: {
    collegeOrSchool: string;
    board: HigherEducationBoard;
    gradeOrGpa: string;
  };

  address: string;

  status: ApplicationStatus;

  documents: {
    citizenship: {
      public_id: string;
      url: string;
      resourceType: "image" | "raw";
      format: string;
    };

    cover: {
      public_id: string;
      url: string;
      resourceType: "image" | "raw";
      format: string;
    };

    characterCertificate: {
      public_id: string;
      url: string;
      resourceType: "image" | "raw";
      format: string;
    };

    document: {
      public_id: string;
      url: string;
      resourceType: "image" | "raw";
      format: string;
    };

    marksheet12: {
      public_id: string;
      url: string;
      resourceType: "image" | "raw";
      format: string;
    };
  };

  applicantImage: {
    public_id: string;
    url: string;
    resourceType: "image";
    format: string;
  };

  createdBy?: string;

  createdAt: string;
  updatedAt: string;
}