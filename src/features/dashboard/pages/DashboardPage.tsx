import { useQuery } from '@tanstack/react-query'
import { DashboardService } from '../services/dashboard.service';


const DashboardPage = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch
  } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: DashboardService.getSummary,
  });

  console.log("Dashboard data:", data);
  console.log("Dashboard error:", error);

  if (isLoading) {
    return <div>Loading dashboard...</div>;
  }

  if (isError) {
    return <div>Failed to load the dashboard: {error.message}</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {isFetching && <div>Refreshing...</div>}

      <p>Total Users: {data.totalUsers}</p>
      <p>Total Projects: {data.totalProjects}</p>
      <p>Total Revenue: {data.totalRevenue}</p>
      <p>Active Users: {data.activeUsers}</p>

      <div>
        <button disabled={isFetching} onClick={() => refetch()}>{isFetching ? 'Refreshing' : 'Refresh'}</button>
      </div>
    </div>
  );
};

export default DashboardPage;