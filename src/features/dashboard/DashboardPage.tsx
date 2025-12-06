// src/features/dashboard/DashboardPage.tsx
import { useState } from 'react';
import { StatsCard } from '../../shared/components/Card/StatsCard';
import { type PeriodValue } from '../../shared/components/Card/StatsCard';

export function DashboardPage() {
  const [launchesPeriod, setLaunchesPeriod] = useState<PeriodValue>(30);
  const [dragonsPeriod, setDragonsPeriod] = useState<PeriodValue>(30);
  const [rocketsPeriod, setRocketsPeriod] = useState<PeriodValue>(30);
  const [missionsPeriod, setMissionsPeriod] = useState<PeriodValue>(30);

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-2">Overview</h1>
      <p className="text-sm text-gray-600 mb-6">
        High-level view of launches, dragons, rockets, and missions.
      </p>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <StatsCard
          title="Launches"
          period={launchesPeriod}
          onPeriodChange={setLaunchesPeriod}
          items={[
            { label: 'Rockets', value: 6720 },
            { label: 'Ships', value: 2842 },
            { label: 'Missions', value: 2512 },
          ]}
          onBodyClickPath="/launches"
        />

        <StatsCard
          title="Dragons"
          period={dragonsPeriod}
          onPeriodChange={setDragonsPeriod}
          items={[
            { label: 'Draco', value: 18 },
            { label: 'SuperDraco', value: 8 },
          ]}
          onBodyClickPath="/dragons"
        />

        <StatsCard
          title="Rockets"
          period={rocketsPeriod}
          onPeriodChange={setRocketsPeriod}
          items={[
            { label: 'Falcon 9', value: 90 },
            { label: 'Falcon Heavy', value: 12 },
          ]}
          onBodyClickPath="/rockets"
        />

        <StatsCard
          title="Missions"
          period={missionsPeriod}
          onPeriodChange={setMissionsPeriod}
          items={[
            { label: 'Completed', value: 120 },
            { label: 'Planned', value: 15 },
          ]}
          onBodyClickPath="/missions"
        />
      </div>
    </section>
  );
}
