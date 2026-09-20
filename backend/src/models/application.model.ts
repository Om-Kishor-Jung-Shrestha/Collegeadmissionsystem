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
| Validation Regex
|--------------------------------------------------------------------------
*/

export const EMAIL_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const PHONE_REGEX =
  /^\+?[0-9\s\-()]{7,20}$/;

/*
|--------------------------------------------------------------------------
| Application Interface
|--------------------------------------------------------------------------
*/

export interface IApplication {
  _id: Types.ObjectId;

  firstName: string;

  middleName?: string;

  lastName: string;

  email: string;

  phone: string;

  /*
   * Reference to Program model
   */
  program: Types.ObjectId;

  academicQualification: string;

  address: string;

  status: ApplicationStatus;

  /*
   * User who created the application.
   */
  createdBy?: Types.ObjectId;

  createdAt: Date;

  updatedAt: Date;
}

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
      | Academic Information
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

/*
 * Useful for filtering applications by
 * status, program and creation date.
 */
applicationSchema.index({
  status: 1,
  program: 1,
  createdAt: -1,
});

/*
 * Useful for finding applications by email.
 */
applicationSchema.index({
  email: 1,
});

/*
 * Useful for searching applicants by name.
 */
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