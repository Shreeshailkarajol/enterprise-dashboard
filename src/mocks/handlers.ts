import { http, HttpResponse } from "msw";
import { users } from "./data/users";
import type { LoginRequest } from "../features/auth/types/auth.dto";

export const handlers = [
  // LOGIN
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

  // DASHBOARD
  http.get("/api/dashboard/summary", async () => {
    return HttpResponse.json({
      totalUsers: 1250,
      totalProjects: 48,
      totalRevenue: 2450000,
      activeUsers: 875,
    });
  }),

  // USERS
  http.get("/api/users", async ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get("page")) || 1;
    const search = (
      url.searchParams.get("search") || ""
    ).toLowerCase();

    const pageSize = 5;

    // Search
    const filteredUsers = users.filter((user) => {
      const searchText = search.trim();

      if (!searchText) {
        return true;
      }

      return (
        user.name.toLowerCase().includes(searchText) ||
        user.email.toLowerCase().includes(searchText) ||
        user.role.toLowerCase().includes(searchText)
      );
    });

    // Pagination
    const total = filteredUsers.length;

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedUsers = filteredUsers.slice(
      startIndex,
      endIndex
    );

    return HttpResponse.json({
      users: paginatedUsers,
      total,
      page,
      pageSize,
    });
  }),
];