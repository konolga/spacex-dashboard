import { useNavigate } from 'react-router-dom';

type StatsItem = {
  label: string;
  value: number;
};

export const PERIOD_OPTIONS = [
  { label: 'Last 30 days', value: 30 },
  { label: 'Last 180 days', value: 180 },
  { label: 'Last 365 days', value: 365 },
];

export type PeriodValue = 30 | 180 | 365;

type StatsCardProps = {
  title: string;
  items: StatsItem[];
  period: PeriodValue;
  onPeriodChange: (value: PeriodValue) => void;
  onBodyClickPath?: string;
};

export function StatsCard({
  title,
  items,
  period,
  onPeriodChange,
  onBodyClickPath,
}: StatsCardProps) {
  const max = items.length ? Math.max(...items.map((i) => i.value)) : 0;
  const navigate = useNavigate();

  const handleBodyClick = () => {
    if (onBodyClickPath) {
      navigate(onBodyClickPath);
    }
  };

  return (
    <section className="bg-white rounded-xl border border-gray-200 px-5 py-4 flex flex-col">
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>

        <select
          value={period}
          onChange={(event) => onPeriodChange(Number(event.target.value) as PeriodValue)}
          className="rounded-md border border-gray-200 px-3 py-1 text-xs text-gray-600 bg-white hover:bg-gray-50"
        >
          {PERIOD_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </header>

      <button
        type="button"
        onClick={handleBodyClick}
        className="flex items-end gap-4 flex-1 w-full text-left hover:bg-gray-50 rounded-lg p-1"
      >
        {items.map((item) => {
          const heightPct = max > 0 ? (item.value / max) * 100 : 0;

          return (
            <div key={item.label} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-blue-50 rounded-md overflow-hidden h-24 flex items-end">
                <div
                  className="w-full bg-blue-500 transition-[height]"
                  style={{ height: `${heightPct || 4}%` }}
                />
              </div>
              <div className="text-xs text-gray-900 font-medium">{item.value}</div>
              <div className="text-[11px] text-gray-500 truncate">{item.label}</div>
            </div>
          );
        })}
      </button>
    </section>
  );
}
