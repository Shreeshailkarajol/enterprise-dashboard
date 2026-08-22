export interface Users {
    users: Users[];
    total: number;
    page: number;
    pageSize: number
}


export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface UsersResponse {
  users: DashboardUser[];
  total: number;
  page: number;
  pageSize: number;
}