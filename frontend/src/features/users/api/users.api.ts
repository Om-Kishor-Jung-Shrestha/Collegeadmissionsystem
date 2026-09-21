import { baseApi } from "@/services/base-api";

import type {
  UserManagementResponseDto,
} from "../types/user.types";

import type {
  UserQueryDto,
} from "../types/user-query.types";

import type {
  UserIdParamDto,
} from "../types/user-param.types";

import type {
  UpdateUserStatusDto,
} from "../types/update-user-status.types";

import type {
  UpdateUserRoleDto,
} from "../types/update-user-role.types";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<
      UserManagementResponseDto[],
      UserQueryDto | void
    >({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params: params ?? undefined,
      }),

      providesTags: ["User"],
    }),

    getUser: builder.query<
      UserManagementResponseDto,
      UserIdParamDto
    >({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: "GET",
      }),

      providesTags: (_result, _error, { id }) => [
        {
          type: "User",
          id,
        },
      ],
    }),

    updateUserStatus: builder.mutation<
      UserManagementResponseDto,
      UserIdParamDto & UpdateUserStatusDto
    >({
      query: ({ id, status }) => ({
        url: `/users/${id}/status`,
        method: "PATCH",
        body: {
          status,
        },
      }),

      invalidatesTags: (_result, _error, { id }) => [
        "User",
        {
          type: "User",
          id,
        },
      ],
    }),

    updateUserRole: builder.mutation<
      UserManagementResponseDto,
      UserIdParamDto & UpdateUserRoleDto
    >({
      query: ({ id, role }) => ({
        url: `/users/${id}/role`,
        method: "PATCH",
        body: {
          role,
        },
      }),

      invalidatesTags: (_result, _error, { id }) => [
        "User",
        {
          type: "User",
          id,
        },
      ],
    }),

    deleteUser: builder.mutation<
      null,
      UserIdParamDto
    >({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserStatusMutation,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} = usersApi;