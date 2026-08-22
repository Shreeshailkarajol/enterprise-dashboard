import { http, HttpResponse } from "msw";
import { users } from "./data/users";
import type { LoginRequest } from "../features/auth/types/auth.dto";

export const handlers = [
  http.post("/api/auth/login", async ({ request }) => {
    const body = (await request.json()) as LoginRequest;

    const user = users.find(
      (u) =>
        u.email === body.email &&
        u.password === body.password
    );

    if (!user) {
      return HttpResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    return HttpResponse.json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user.id,
          name: user.name,
          role: user.role,
        },
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
        expiresIn: 900,
      },
    });
  }),

  http.get("/api/dashboard/summary", async () => {
    return HttpResponse.json({
      totalUsers: 1250,
      totalProjects: 48,
      totalRevenue: 2450000,
      activeUsers: 875,
    });
  }),
];