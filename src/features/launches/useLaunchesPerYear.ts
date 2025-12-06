import { useEffect, useState } from 'react';
import { graphqlClient } from '../../shared/config/graphqlClient';
import { mapLaunch, groupLaunchesByYear } from './launches.utils';
import type { LaunchesByYear, LaunchApi } from './launches.types';

const LAUNCHES_PER_YEAR = `
  query LaunchesForChart {
    launchesPast {
      id
      mission_name
      launch_date_utc
      launch_date_local
      launch_year
    }
  }
`;

let cachedLaunches: LaunchesByYear[] | null = null;
let cacheError: Error | null = null;

export function useLaunchesPerYear() {
  const [data, setData] = useState<LaunchesByYear[]>(cachedLaunches ?? []);
  const [loading, setLoading] = useState(!cachedLaunches && !cacheError);
  const [error, setError] = useState<Error | null>(cacheError);

  useEffect(() => {
    if (cachedLaunches || cacheError) {
      setData(cachedLaunches ?? []);
      setError(cacheError);
      setLoading(false);
      return;
    }

    async function fetchLaunchesForChart() {
      try {
        setLoading(true);
        setError(null);

        const result = await graphqlClient.request(LAUNCHES_PER_YEAR);
        const raw: LaunchApi[] = result.launchesPast ?? [];
        const mapped = raw.map(mapLaunch);
        cachedLaunches = groupLaunchesByYear(mapped);

        setData(cachedLaunches);
      } catch (err) {
        const e = err instanceof Error ? err : new Error('Unknown error');
        cacheError = e;
        setError(e);
      } finally {
        setLoading(false);
      }
    }

    fetchLaunchesForChart();
  }, []);

  return { data, loading, error };
}
