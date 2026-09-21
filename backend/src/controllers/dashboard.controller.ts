import {
  Request,
  Response,
} from "express";

import {
  getDashboardService,
} from "../services/dashboard/get-dashboard.service";

export async function getDashboard(
  _req: Request,
  res: Response
): Promise<void> {
  const dashboard =
    await getDashboardService();

  res.apiSuccess(
    dashboard,
    "Dashboard retrieved successfully"
  );
}