
import { baseApi } from "@/services/base-api";



import type {
  CourseQueryDto,
} from "../types/course-query.types";

import type {
  CourseIdParamDto,
  CreateCourseDto,
  CourseResponseDto,
  UpdateCourseDto,
} from "../types/course.types";

export const coursesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ─────────────────────────────────────────────
    // GET ALL COURSES
    // GET /courses
    // ─────────────────────────────────────────────
    getCourses: builder.query<
      CourseResponseDto[],
      CourseQueryDto | void
    >({
      query: (params) => ({
        url: "/courses",
        method: "GET",
        params: params ?? undefined,
      }),

      providesTags: ["Course"],
    }),

    // ─────────────────────────────────────────────
    // GET SINGLE COURSE
    // GET /courses/:id
    // ─────────────────────────────────────────────
    getCourse: builder.query<
      CourseResponseDto,
      CourseIdParamDto
    >({
      query: ({ id }) => ({
        url: `/courses/${id}`,
        method: "GET",
      }),

      providesTags: (_result, _error, { id }) => [
        {
          type: "Course",
          id,
        },
      ],
    }),

    // ─────────────────────────────────────────────
    // CREATE COURSE
    // POST /courses
    // ─────────────────────────────────────────────
    createCourse: builder.mutation<
      CourseResponseDto,
      CreateCourseDto
    >({
      query: (body) => ({
        url: "/courses",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Course"],
    }),

    // ─────────────────────────────────────────────
    // UPDATE COURSE
    // PATCH /courses/:id
    // ─────────────────────────────────────────────
    updateCourse: builder.mutation<
      CourseResponseDto,
      CourseIdParamDto & UpdateCourseDto
    >({
      query: ({ id, ...body }) => ({
        url: `/courses/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (_result, _error, { id }) => [
        "Course",
        {
          type: "Course",
          id,
        },
      ],
    }),

    // ─────────────────────────────────────────────
    // DELETE COURSE
    // DELETE /courses/:id
    // ─────────────────────────────────────────────
    deleteCourse: builder.mutation<
      null,
      CourseIdParamDto
    >({
      query: ({ id }) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Course"],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useLazyGetCoursesQuery,
  useGetCourseQuery,
  useLazyGetCourseQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = coursesApi;

