import { useState } from 'react';
import { useLaunchesPerYear } from './useLaunchesPerYear';
import { LaunchesChart } from './LaunchesChart';
import { useLaunches } from './useLaunches';

export function LaunchesPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { launches, byYear, loading, error } = useLaunches({ page, pageSize });
  const { data: chartData, loading: chartLoading, error: chartError } = useLaunchesPerYear();

  return (
    <section>
      <h1 className="text-xl font-semibold mb-4">Launches</h1>

      {loading && <div className="text-sm text-gray-500 mb-4">Loading launches…</div>}
      {error && (
        <div className="text-sm text-red-600 mb-4">Failed to load launches. Please try again.</div>
      )}

      <LaunchesChart data={chartData} />
    </section>
  );
}
