import { Routes, Route } from 'react-router-dom';
import { Layout } from './shared/components/Layout/Layout';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { LaunchesPage } from './features/launches/LaunchesPage';
import { DragonsPage } from './features/dragons/DragonsPage';
import { RocketsPage } from './features/rockets/RocketsPage';
import { MissionsPage } from './features/missions/MissionsPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/launches" element={<LaunchesPage />} />
        <Route path="/dragons" element={<DragonsPage />} />
        <Route path="/rockets" element={<RocketsPage />} />
        <Route path="/missions" element={<MissionsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
