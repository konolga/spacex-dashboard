import { useState } from 'react';
import { useLaunches } from './useLaunches';

export function LaunchesPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { launches, byYear, loading, error } = useLaunches({ page, pageSize });

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Launches</h1>
      <pre>{JSON.stringify({ launchesCount: launches.length, byYear }, null, 2)}</pre>
      {loading && <div>Loading…</div>}
      {error && <div>Failed to load launches</div>}
    </div>
  );
}
