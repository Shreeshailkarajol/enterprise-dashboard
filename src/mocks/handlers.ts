import { http, HttpResponse } from 'msw';
import { users } from './data/users';
import type { LoginRequest } from '../features/auth/types/auth.dto';

const getUserFromAccessToken = (request: Request) => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader?.startsWith('Bearer ')) {
        return null;
    }

    const token = authHeader.replace('Bearer ', '');
    const match = token.match(/^mock-access-token-(.+)$/);

    if (!match) {
        return null;
    }

    return users.find((user) => String(user.id) === match[1]) ?? null;
};

export const handlers = [
    // LOGIN
    http.post('/api/auth/login', async ({ request }) => {
        const body = (await request.json()) as LoginRequest;

        const user = users.find(
            (u) => u.email === body.email && u.password === body.password
        );

        if (!user) {
            return HttpResponse.json(
                {
                    success: false,
                    message: 'Invalid email or password',
                },
                { status: 401 }
            );
        }

        return HttpResponse.json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    role: user.role,
                },
                accessToken: `mock-access-token-${user.id}`,
                refreshToken: `mock-refresh-token-${user.id}`,
                expiresIn: 900,
            },
        });
    }),

    // REFRESH TOKEN
    http.post('/api/auth/refresh', async ({ request }) => {
        const body = (await request.json()) as {
            refreshToken: string;
        };

        const match = body.refreshToken.match(/^mock-refresh-token-(.+)$/);

        const user = match
            ? users.find((u) => String(u.id) === match[1])
            : null;

        if (!user) {
            return HttpResponse.json(
                {
                    success: false,
                    message: 'Invalid refresh token',
                },
                { status: 401 }
            );
        }

        return HttpResponse.json({
            success: true,
            message: 'Token refreshed successfully',
            data: {
                accessToken: `mock-access-token-${user.id}`,
                refreshToken: `mock-refresh-token-${user.id}`,
                expiresIn: 900,
            },
        });
    }),

    // CURRENT USER PROFILE
    http.get('/api/auth/me', async ({ request }) => {
        const user = getUserFromAccessToken(request);

        if (!user) {
            return HttpResponse.json(
                {
                    success: false,
                    message: 'Unauthorized',
                },
                { status: 401 }
            );
        }

        return HttpResponse.json({
            success: true,
            message: 'User profile fetched successfully',
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    }),

    // DASHBOARD
    http.get('/api/dashboard/summary', async () => {
        return HttpResponse.json({
            totalUsers: 1250,
            totalProjects: 48,
            totalRevenue: 2450000,
            activeUsers: 875,
        });
    }),

    // USERS
    http.get('/api/users', async ({ request }) => {
        const url = new URL(request.url);

        const page = Number(url.searchParams.get('page')) || 1;
        const search = (url.searchParams.get('search') || '').toLowerCase();

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

        const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

        return HttpResponse.json({
            users: paginatedUsers,
            total,
            page,
            pageSize,
        });
    }),
];
