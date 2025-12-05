import type { LaunchApi, Launch, LaunchesByYear } from './launches.types';

function getLaunchYearFromDate(dateString: string | null): number | null {
  if (!dateString) return null;

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return null;

  return date.getFullYear();
}

export function mapLaunch(apiLaunch: LaunchApi): Launch {
  const yearFromUtc = getLaunchYearFromDate(apiLaunch.launch_date_utc);
  const yearFromLocal = getLaunchYearFromDate(apiLaunch.launch_date_local);

  return {
    id: apiLaunch.id,
    missionName: apiLaunch.mission_name ?? 'Unknown mission',
    launchDateUtc: apiLaunch.launch_date_utc,
    launchDateLocal: apiLaunch.launch_date_local,
    launchYear: yearFromUtc ?? yearFromLocal ?? null,
    rocketName: apiLaunch.rocket?.rocket_name ?? null,
    articleLink: apiLaunch.links?.article_link ?? null,
    videoLink: apiLaunch.links?.video_link ?? null,
    details: apiLaunch.details,
  };
}

export function groupLaunchesByYear(launches: Launch[]): LaunchesByYear[] {
  const grouped = new Map();

  launches.forEach((launch) => {
    const key = launch.launchYear;
    const group = grouped.get(key) ?? [];
    group.push(launch);
    grouped.set(key, group);
  });
  const result = Array.from(grouped.entries()).map(([year, group]) => ({
    year,
    count: group.length,
    missions: group.map((l: Launch) => l.missionName).filter(Boolean),
  }));

return result.sort((a, b) => {
  // Case 1: a has unknown year → a should come after b
  if (a.year === null && b.year !== null) return 1;

  // Case 2: b has unknown year → b should come before a
  if (b.year === null && a.year !== null) return -1;

  // Case 3: both years are unknown → keep relative order
  if (a.year === null && b.year === null) return 0;

  // Case 4: both years are numbers → normal numeric compare
  return a.year - b.year;
});
}
