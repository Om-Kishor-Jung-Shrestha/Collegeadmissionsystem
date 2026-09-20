import mongoose, {
  Model,
  Schema,
  Types,
} from "mongoose";

/*
|--------------------------------------------------------------------------
| Application Status
|--------------------------------------------------------------------------
*/

export const APPLICATION_STATUSES = [
  "Pending",
  "Under Review",
  "Approved",
  "Rejected",
] as const;

export type ApplicationStatus =
  (typeof APPLICATION_STATUSES)[number];

/*
|--------------------------------------------------------------------------
| Board of Higher Education
|--------------------------------------------------------------------------
*/

export const HIGHER_EDUCATION_BOARDS = [
  "NEB +2",
  "CBSE 12",
  "GCE A Level",
] as const;

export type HigherEducationBoard =
  (typeof HIGHER_EDUCATION_BOARDS)[number];

/*
|--------------------------------------------------------------------------
| Validation Regex
|--------------------------------------------------------------------------
*/

export const EMAIL_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const PHONE_REGEX =
  /^\+?[0-9\s\-()]{7,20}$/;

/*
|--------------------------------------------------------------------------
| Academic History
|--------------------------------------------------------------------------
*/

export interface IAcademicHistory {
  collegeOrSchool: string;
  board: HigherEducationBoard;
  gradeOrGpa: string;
}

/*
|--------------------------------------------------------------------------
| Application Document
|--------------------------------------------------------------------------
*/

export interface IApplicationDocument {
  public_id: string;
  url: string;
  resourceType: "image" | "raw";
  format: string;
}

/*
|--------------------------------------------------------------------------
| Application Documents
|--------------------------------------------------------------------------
*/

export interface IApplicationDocuments {
  citizenship: IApplicationDocument;
  cover: IApplicationDocument;
  characterCertificate: IApplicationDocument;
  document: IApplicationDocument;
  marksheet12: IApplicationDocument;
}

/*
|--------------------------------------------------------------------------
| Applicant Image
|--------------------------------------------------------------------------
*/

export interface IApplicantImage {
  public_id: string;
  url: string;
  resourceType: "image";
  format: string;
}

/*
|--------------------------------------------------------------------------
| Application Interface
|--------------------------------------------------------------------------
*/

export interface IApplication {
  _id: Types.ObjectId;

  /*
  |--------------------------------------------------------------------------
  | Applicant Information
  |--------------------------------------------------------------------------
  */

  firstName: string;

  middleName?: string;

  lastName: string;

  /*
  |--------------------------------------------------------------------------
  | Contact Information
  |--------------------------------------------------------------------------
  */

  email: string;

  phone: string;

  /*
  |--------------------------------------------------------------------------
  | Program
  |--------------------------------------------------------------------------
  */

  program: Types.ObjectId;

  /*
  |--------------------------------------------------------------------------
  | Academic Information
  |--------------------------------------------------------------------------
  */

  academicQualification: string;

  academicHistory: IAcademicHistory;

  /*
  |--------------------------------------------------------------------------
  | Address
  |--------------------------------------------------------------------------
  */

  address: string;

  /*
  |--------------------------------------------------------------------------
  | Documents
  |--------------------------------------------------------------------------
  */

  documents: IApplicationDocuments;

  /*
  |--------------------------------------------------------------------------
  | Applicant Image
  |--------------------------------------------------------------------------
  */

  applicantImage: IApplicantImage;

  /*
  |--------------------------------------------------------------------------
  | Application Status
  |--------------------------------------------------------------------------
  */

  status: ApplicationStatus;

  /*
  |--------------------------------------------------------------------------
  | Created By
  |--------------------------------------------------------------------------
  */

  createdBy?: Types.ObjectId;

  createdAt: Date;

  updatedAt: Date;
}

/*
|--------------------------------------------------------------------------
| Academic History Schema
|--------------------------------------------------------------------------
*/

const academicHistorySchema =
  new Schema<IAcademicHistory>(
    {
      collegeOrSchool: {
        type: String,
        required: [
          true,
          "College or school name is required",
        ],
        trim: true,
        minlength: [
          2,
          "College or school name must be at least 2 characters",
        ],
        maxlength: [
          200,
          "College or school name cannot exceed 200 characters",
        ],
      },

      board: {
        type: String,
        enum: {
          values: HIGHER_EDUCATION_BOARDS,
          message: "Invalid higher education board",
        },
        required: [
          true,
          "Board of higher education is required",
        ],
      },

      gradeOrGpa: {
        type: String,
        required: [
          true,
          "Grade or GPA is required",
        ],
        trim: true,
        maxlength: [
          20,
          "Grade or GPA cannot exceed 20 characters",
        ],
      },
    },
    {
      _id: false,
    }
  );

/*
|--------------------------------------------------------------------------
| Application Document Schema
|--------------------------------------------------------------------------
*/

const applicationDocumentSchema =
  new Schema<IApplicationDocument>(
    {
      public_id: {
        type: String,
        required: [
          true,
          "Document public ID is required",
        ],
      },

      url: {
        type: String,
        required: [
          true,
          "Document URL is required",
        ],
      },

      resourceType: {
        type: String,
        enum: ["image", "raw"],
        required: true,
      },

      format: {
        type: String,
        required: [
          true,
          "Document format is required",
        ],
        lowercase: true,
      },
    },
    {
      _id: false,
    }
  );

/*
|--------------------------------------------------------------------------
| Application Documents Schema
|--------------------------------------------------------------------------
*/

const applicationDocumentsSchema =
  new Schema<IApplicationDocuments>(
    {
      citizenship: {
        type: applicationDocumentSchema,
        required: [
          true,
          "Citizenship document is required",
        ],
      },

      cover: {
        type: applicationDocumentSchema,
        required: [
          true,
          "Cover document is required",
        ],
      },

      characterCertificate: {
        type: applicationDocumentSchema,
        required: [
          true,
          "Character certificate is required",
        ],
      },

      document: {
        type: applicationDocumentSchema,
        required: [
          true,
          "Document is required",
        ],
      },

      marksheet12: {
        type: applicationDocumentSchema,
        required: [
          true,
          "12th marksheet is required",
        ],
      },
    },
    {
      _id: false,
    }
  );

/*
|--------------------------------------------------------------------------
| Applicant Image Schema
|--------------------------------------------------------------------------
*/

const applicantImageSchema =
  new Schema<IApplicantImage>(
    {
      public_id: {
        type: String,
        required: [
          true,
          "Applicant image public ID is required",
        ],
      },

      url: {
        type: String,
        required: [
          true,
          "Applicant image URL is required",
        ],
      },

      resourceType: {
        type: String,
        enum: ["image"],
        required: true,
        default: "image",
      },

      format: {
        type: String,
        required: [
          true,
          "Applicant image format is required",
        ],
        lowercase: true,
      },
    },
    {
      _id: false,
    }
  );

/*
|--------------------------------------------------------------------------
| Application Schema
|--------------------------------------------------------------------------
*/

const applicationSchema =
  new Schema<IApplication>(
    {
      /*
      |--------------------------------------------------------------------------
      | Applicant Information
      |--------------------------------------------------------------------------
      */

      firstName: {
        type: String,
        required: [
          true,
          "First name is required",
        ],
        trim: true,
        minlength: [
          2,
          "First name must be at least 2 characters",
        ],
        maxlength: [
          50,
          "First name cannot exceed 50 characters",
        ],
      },

      middleName: {
        type: String,
        trim: true,
        default: "",
        maxlength: [
          50,
          "Middle name cannot exceed 50 characters",
        ],
      },

      lastName: {
        type: String,
        required: [
          true,
          "Last name is required",
        ],
        trim: true,
        minlength: [
          2,
          "Last name must be at least 2 characters",
        ],
        maxlength: [
          50,
          "Last name cannot exceed 50 characters",
        ],
      },

      /*
      |--------------------------------------------------------------------------
      | Contact Information
      |--------------------------------------------------------------------------
      */

      email: {
        type: String,
        required: [
          true,
          "Email is required",
        ],
        trim: true,
        lowercase: true,
        match: [
          EMAIL_REGEX,
          "Invalid email address",
        ],
      },

      phone: {
        type: String,
        required: [
          true,
          "Phone number is required",
        ],
        trim: true,
        match: [
          PHONE_REGEX,
          "Invalid phone number",
        ],
      },

      /*
      |--------------------------------------------------------------------------
      | Program
      |--------------------------------------------------------------------------
      */

      program: {
        type: Schema.Types.ObjectId,
        ref: "Program",
        required: [
          true,
          "Program is required",
        ],
      },

      /*
      |--------------------------------------------------------------------------
      | Academic Qualification
      |--------------------------------------------------------------------------
      */

      academicQualification: {
        type: String,
        required: [
          true,
          "Academic qualification is required",
        ],
        trim: true,
        minlength: [
          2,
          "Academic qualification must be at least 2 characters",
        ],
        maxlength: [
          200,
          "Academic qualification cannot exceed 200 characters",
        ],
      },

      /*
      |--------------------------------------------------------------------------
      | Academic History
      |--------------------------------------------------------------------------
      */

      academicHistory: {
        type: academicHistorySchema,
        required: [
          true,
          "Academic history is required",
        ],
      },

      /*
      |--------------------------------------------------------------------------
      | Address
      |--------------------------------------------------------------------------
      */

      address: {
        type: String,
        required: [
          true,
          "Address is required",
        ],
        trim: true,
        minlength: [
          5,
          "Address must be at least 5 characters",
        ],
        maxlength: [
          300,
          "Address cannot exceed 300 characters",
        ],
      },

      /*
      |--------------------------------------------------------------------------
      | Documents
      |--------------------------------------------------------------------------
      */

      documents: {
        type: applicationDocumentsSchema,
        required: [
          true,
          "Application documents are required",
        ],
      },

      /*
      |--------------------------------------------------------------------------
      | Applicant Image
      |--------------------------------------------------------------------------
      */

      applicantImage: {
        type: applicantImageSchema,
        required: [
          true,
          "Applicant image is required",
        ],
      },

      /*
      |--------------------------------------------------------------------------
      | Application Status
      |--------------------------------------------------------------------------
      */

      status: {
        type: String,
        enum: {
          values: APPLICATION_STATUSES,
          message: "Invalid application status",
        },
        required: true,
        default: "Pending",
      },

      /*
      |--------------------------------------------------------------------------
      | Created By
      |--------------------------------------------------------------------------
      */

      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },

    {
      timestamps: true,
    }
  );

/*
|--------------------------------------------------------------------------
| Indexes
|--------------------------------------------------------------------------
*/

applicationSchema.index({
  status: 1,
  program: 1,
  createdAt: -1,
});

applicationSchema.index({
  email: 1,
});

applicationSchema.index({
  firstName: 1,
  middleName: 1,
  lastName: 1,
});

const ApplicationModel: Model<IApplication> =
  mongoose.model<IApplication>(
    "Application",
    applicationSchema
  );

export default ApplicationModel;