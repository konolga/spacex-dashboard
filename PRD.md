# SpaceX Launch Dashboard – SPEC

## 1. Goal & Scope

**Goal**

Build a small but extensible SpaceX launch analytics dashboard using React and TypeScript, backed by the SpaceX GraphQL API, that demonstrates solid frontend architecture, data modeling, and UX within a ~4 hour limit.

**In scope**

- Landing page with 4 cards:
  - Launches, Dragons, Rockets, Missions.
- Launch detail page with:
  - Time-based bar chart of launches by year.
  - Paginated launches table (10 rows per page by default, with configurable page size).
- Basic routing between landing and launch detail pages.
- Loading, empty, and error states that can handle a slow or flaky API.

**Out of scope (for this take-home)**

- Full parity detail pages for Dragons, Rockets, Missions (may add skeletons and describe how to extend).
- Authentication, advanced filters, sorting, or complex state management beyond what is needed.
- Production-level accessibility and performance tuning (will follow basic best practices only).

---

## 2. User stories

1. **Dashboard overview**  
   As an engineer, I want to open the dashboard and immediately see the key entities (Launches, Dragons, Rockets, Missions) so I understand what information is available and where to click.

2. **Launch history visualization**  
   As an engineer, I want to see counts of launches per year so I can quickly understand trends over time.

3. **Launch list exploration**  
   As an engineer, I want to browse launches in a table, with pagination and links to articles/videos, so I can explore individual missions without being overwhelmed.

4. **Resilient experience**  
   As an engineer, I want clear loading and error feedback so I know what’s happening even if the GraphQL API is slow or partially broken.

---

## 3. API & data modeling

**API**

- Base URL: `https://spacex-production.up.railway.app/`.
- Primary query used:
  - `launchesPast` with fields: `id`, `details`, `mission_name`, `launch_date_local`, `launch_date_utc`, `launch_year`, `links { article_link, video_link }`, `rocket { rocket_name }`.
- Pagination:
  - Use `limit` and `offset` arguments on `launchesPast` when possible; otherwise fall back to client-side pagination and document the choice.

**Known quirks & assumptions**

- `launch_year` may be `null`, so year will be derived from `launch_date_utc` (or `launch_date_local` as fallback) via `new Date(launch_date_utc).getFullYear()`.
- The API may be slow; all data fetching surfaces must have a visible loading state and a simple error state with retry.

**Client data model (simplified)**

- `Launch` (UI model)
  - `id: string`
  - `missionName: string`
  - `launchDateUtc: string`
  - `launchDateLocal: string`
  - `launchYear: number | null` (derived)
  - `rocketName: string | null`
  - `articleLink: string | null`
  - `videoLink: string | null`
  - `details: string | null`

- `LaunchesByYear`
  - `year: number | 'Unknown'`
  - `count: number`
  - `missions: string[]`

Transformation logic lives in helpers (e.g., `mapLaunchResponse`, `groupLaunchesByYear`) rather than in components.

---

## 4. Architecture & components

**Tech stack**

- React (functional components + hooks).
- TypeScript.
- GraphQL client: `graphql-request` or Apollo Client.
- Styling: Tailwind CSS or a lightweight component library (e.g., MUI).
- Charts: `recharts` (or similar) for the bar chart.

**Project structure (high level)**

- `src/app`
  - `App.tsx` – layout shell + router.
  - `router.tsx` – route definitions (`/`, `/launches`, future `/dragons`, etc.).
- `src/graphql`
  - `client.ts` – GraphQL client setup.
  - `queries/launches.ts` – `launchesPast` query definitions.
- `src/modules/dashboard`
  - `DashboardPage.tsx` – landing page with 4 cards.
- `src/modules/launches`
  - `LaunchesPage.tsx` – main layout for chart + table.
  - `LaunchesChart.tsx` – bar chart visualization.
  - `LaunchesTable.tsx` – paginated table.
  - `useLaunches.ts` – hook for data fetching + transformation.
- `src/shared`
  - `components` – `Card`, `Pagination`, `Layout`, `ErrorState`, `LoadingSkeleton`.
  - `utils/date.ts` – `getLaunchYear`.
  - `utils/aggregation.ts` – `groupLaunchesByYear`.
  - `types` – shared TypeScript interfaces.

**Key components / hooks**

- `useLaunches({ page, pageSize })`
  - Fetches launches from GraphQL.
  - Maps API data to `Launch[]`.
  - Exposes:
    - `launches`, `loading`, `error`, `totalCount` (if available), `byYear` (aggregated data).

- `LaunchesChart`
  - Props: `data: LaunchesByYear[]`.
  - Renders bar chart with:
    - X-axis: year.
    - Y-axis: count.
    - Tooltip: year, count, and mission names (truncated as needed).

- `LaunchesTable`
  - Props: `launches`, `page`, `pageSize`, `onPageChange`, `onPageSizeChange`.
  - Renders table with mission name, date, rocket, article/video links, and details snippet.

---

## 5. UX & UI behavior

**Landing page**

- Layout:
  - 2x2 card grid on desktop; single column on small screens.
- Each card:
  - Title: Launches / Dragons / Rockets / Missions.
  - Short description and CTA (“View details”).
  - Card is clickable and navigates to corresponding route (e.g., `/launches`).
- If time permits, show a light metric (e.g., count) for Launches using a small query; otherwise keep cards static and describe potential metrics in README.

**Launch detail page**

- Layout:
  - Title and short description.
  - Chart at top, table below.
- Chart:
  - Uses derived years from UTC dates.
  - Hover tooltip shows mission names (with truncation and “+X more” for long lists).
- Table:
  - Default 10 rows per page.
  - Dropdown to select page size (e.g., 5 / 10 / 25).
  - Pagination controls (previous/next, page numbers if time permits).
  - Links open in new tabs where applicable.

**States**

- Loading:
  - Skeletons or spinners for chart and table while data is fetched.
- Error:
  - Simple error message with a “Retry” button that re-triggers the query.
- Empty:
  - Message like “No launches available for this query” if API returns an empty list.

---

## 6. Testing & quality

Within time constraints, target:

- Unit tests:
  - `getLaunchYear` handles valid date strings, invalid values, and nulls.
  - `groupLaunchesByYear` aggregates correctly and handles unknown years.
- Component tests:
  - `LaunchesTable` renders the right number of rows for a given page and reacts to `onPageChange`.
  - Basic render test for `LaunchesChart` to ensure it accepts data and renders bars.

Static quality:

- TypeScript configured to catch obvious type issues.
- ESLint + Prettier for formatting and basic linting.

---

## 7. Timeline / task breakdown

Target total: ~4 hours. Actual time may differ; any overruns will be documented.

1. **Planning (15–20 min)**
   - Finalize this spec and refine scope.

2. **Setup (20–30 min)**
   - Scaffold React + TS project, install dependencies (GraphQL client, chart library, router, styling).
   - Configure GraphQL client against SpaceX endpoint.

3. **Data layer (40–60 min)**
   - Implement `launchesPast` query and `useLaunches` hook.
   - Implement mapping and aggregation helpers (`getLaunchYear`, `groupLaunchesByYear`).

4. **Launch UI (60–90 min)**
   - Build `LaunchesChart` and `LaunchesTable`.
   - Build `LaunchesPage` with loading/error/empty states.

5. **Dashboard + skeleton pages (30–40 min)**
   - Implement `DashboardPage` and routing.
   - Add placeholder pages for Dragons, Rockets, Missions.

6. **Polish & tests (30–40 min)**
   - Add minimal tests.
   - Tidy styles and layout for basic responsiveness.
   - Capture screenshot, complete README with assumptions and future work.
