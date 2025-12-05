import { useEffect, useState } from 'react';
import { fetchLaunchesPast } from './launches.api';
import { mapLaunch, groupLaunchesByYear } from './launches.utils';
import type { Launch, LaunchesByYear } from './launches.types';

type UseLaunchesOptions = {
  page: number;
  pageSize: number;
};

type UseLaunchesResult = {
  launches: Launch[];
  byYear: LaunchesByYear[];
  loading: boolean;
  error: Error | null;
};

export function useLaunches({ page, pageSize }: UseLaunchesOptions): UseLaunchesResult {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [byYear, setByYear] = useState<LaunchesByYear[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const offset = (page - 1) * pageSize;
        const rawLaunches = await fetchLaunchesPast({ limit: pageSize, offset });
        const mapped = rawLaunches.map(mapLaunch);
        const grouped = groupLaunchesByYear(mapped);

        setLaunches(mapped);
        setByYear(grouped);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [page, pageSize]);

  return { launches, byYear, loading, error };
}
