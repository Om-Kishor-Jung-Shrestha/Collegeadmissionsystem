import {
  toDashboardApplicationStatsDto,
  toDashboardProgramStatsDto,
  toDashboardResponseDto,
  toDashboardUserStatsDto,
} from "../../mapper/dashboard.mapper";

import { getApplicationStatsService } from "./get-application-stats.service";
import { getProgramStatsService } from "./get-program-stats.service";
import { getUserStatsService } from "./get-user-stats.service";

export async function getDashboardService() {
  const [
    applicationStats,
    programStats,
    userStats,
  ] = await Promise.all([
    getApplicationStatsService(),
    getProgramStatsService(),
    getUserStatsService(),
  ]);

  const applications =
    toDashboardApplicationStatsDto(
      applicationStats
    );

  const programs =
    toDashboardProgramStatsDto(
      programStats
    );

  const users =
    toDashboardUserStatsDto(
      userStats
    );

  return toDashboardResponseDto(
    applications,
    programs,
    users
  );
}