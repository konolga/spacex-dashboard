import { Link } from 'react-router-dom';

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold">
          SpaceX Dashboard
        </Link>

        <nav className="flex gap-3 text-sm">
          <Link to="/">Dashboard</Link>
          <Link to="/launches">Launches</Link>
          <Link to="/dragons">Dragons</Link>
          <Link to="/rockets">Rockets</Link>
          <Link to="/missions">Missions</Link>
        </nav>
      </header>

      <main className="flex-1 px-4 py-6 max-w-5xl mx-auto">{children}</main>
    </div>
  );
}
