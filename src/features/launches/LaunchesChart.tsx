import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import type { LaunchesByYear } from './launches.types';

type LaunchesChartProps = {
  data: LaunchesByYear[];
};

type MissionsTooltipProps = {
  active?: boolean;
  payload?: { payload: LaunchesByYear }[];
  label?: string | number;
};

function formatYear(year: number | null) {
  return year === null ? 'Unknown' : String(year);
}

function MissionsTooltip(props: MissionsTooltipProps) {
  const { active, payload } = props;
  if (!active || !payload || !payload.length) return null;

  const datum = payload[0].payload;
  const missions = Array.isArray(datum.missions) ? datum.missions : [];

  const maxMissionsToShow = 5;
  const visibleMissions = missions.slice(0, maxMissionsToShow);
  const remaining = missions.length - visibleMissions.length;

  return (
    <div className="rounded-md border border-gray-200 bg-white px-3 py-2 shadow-sm text-xs">
      <div className="font-semibold mb-1">{formatYear(datum.year)}</div>
      <div className="mb-1 text-gray-600">Launches: {datum.count}</div>
      {visibleMissions.length > 0 && (
        <ul className="space-y-0.5">
          {visibleMissions.map((name: string) => (
            <li key={name} className="text-gray-700">
              • {name}
            </li>
          ))}
          {remaining > 0 && <li className="text-gray-400">+{remaining} more missions</li>}
        </ul>
      )}
    </div>
  );
}

export function LaunchesChart({ data }: LaunchesChartProps) {
  if (!data.length) {
    return (
      <div className="text-sm text-gray-500">No launch data available for the selected range.</div>
    );
  }

  const chartData = data.map((item) => ({
    ...item,
    yearLabel: formatYear(item.year),
  }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width={400} height={400}>
        <BarChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis
            dataKey="yearLabel"
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
            tick={{ fontSize: 11, fill: '#6b7280' }}
          />
          <YAxis
            allowDecimals={false}
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
            tick={{ fontSize: 11, fill: '#6b7280' }}
          />
          <Tooltip cursor={{ fill: 'rgba(59,130,246,0.08)' }} content={<MissionsTooltip />} />
          <Bar dataKey="count" fill="#60a5fa" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
