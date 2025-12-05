# TASKS – SpaceX Launch Dashboard

## 1. Planning & Repo

- [x] Create repo and scaffold React + TypeScript app (Vite or CRA).
- [x] Add `SPEC.md`, `TASKS.md`, and initial `README.md` with problem restatement.
- [x] Set up basic project structure (`app`, `modules`, `shared`, `graphql`).

## 2. Tooling & Infrastructure

- [x] Install dependencies:
  - [x] React Router.
  - [x] GraphQL client (`graphql-request` or Apollo).
  - [x] Chart library (`recharts` or similar).
  - [ ] Styling solution (Tailwind or component library).
- [x] Configure ESLint + Prettier and basic TypeScript settings.
- [x] Add `graphql/client` file pointing to `https://spacex-production.up.railway.app/`.

## 3. GraphQL & Data Layer

- [x] Define `launchesPast` query with required fields (`id`, `mission_name`, dates, links, rocket, details).
- [x] Implement `mapLaunchResponse` to convert API response → `Launch` UI model.
- [x] Implement `getLaunchYear(launch)` using `launch_date_utc` / `launch_date_local`.
- [ ] Implement `groupLaunchesByYear`
- [x] Implement `useLaunches({ page, pageSize })`:
  - [x] Fetch data from GraphQL with `limit` and `offset` if supported.
  - [x] Expose `launches`, `byYear`, `loading`, `error`, and optionally `totalCount`.

## 4. Routing & Layout

- [ ] Configure app routes:
  - [ ] `/` → `DashboardPage`.
  - [ ] `/launches` → `LaunchesPage`.
  - [ ] `/dragons`, `/rockets`, `/missions` → placeholder pages.
- [ ] Create basic layout shell (header, main content, simple responsive container).

## 5. Dashboard (Landing) Page

- [ ] Implement `DashboardPage` component.
- [ ] Add 4 cards:
  - [ ] Launches.
  - [ ] Dragons.
  - [ ] Rockets.
  - [ ] Missions.
- [ ] Make each card clickable, navigating to corresponding route.
- [ ] Add minimal copy and visual polish (spacing, hover states).

## 6. Launch Detail – Chart

- [ ] Implement `LaunchesChart` component:
  - [ ] Accepts `data: LaunchesByYear[]`.
  - [ ] Renders responsive bar chart (year on X, count on Y).
  - [ ] Adds tooltip that shows year, count, and mission names (truncated where necessary).
- [ ] Handle empty data (render “No data to display” message).

## 7. Launch Detail – Table

- [ ] Implement `LaunchesTable` component:
  - [ ] Columns: Mission, Date (local), Rocket, Article, Video, Details snippet.
  - [ ] Accepts pagination props: `page`, `pageSize`, `onPageChange`, `onPageSizeChange`.
- [ ] Implement pagination controls:
  - [ ] Previous / Next buttons.
  - [ ] Page size selector (e.g., 5 / 10 / 25 rows per page) for the bonus.
- [ ] Handle links opening in new tab with proper attributes.
- [ ] Handle empty state with a friendly message.

## 8. Launch Detail – Page Composition

- [ ] Implement `LaunchesPage`:
  - [ ] Uses `useLaunches` to fetch data based on page + pageSize.
  - [ ] Renders loading skeletons for chart + table while fetching.
  - [ ] Renders error state with retry button.
  - [ ] Passes `byYear` to `LaunchesChart` and `launches` to `LaunchesTable`.

## 9. Placeholder Entity Pages (Bonus Structure)

- [ ] Create `DragonsPage`, `RocketsPage`, `MissionsPage` with basic text.
- [ ] Optionally stub shared layout/components to show how Launches pattern would extend (describe in README)

## 10. Testing & Quality

- [ ] Unit tests:
  - [ ] `getLaunchYear` – valid date, invalid value, null handling.
  - [ ] `groupLaunchesByYear` – aggregates correctly and handles unknown years
- [ ] Component tests:
  - [ ] `LaunchesTable` – renders rows and reacts to pagination.
  - [ ] Basic render test for `LaunchesPage` showing loading and error states
- [ ] Manual checks:
  - [ ] Resize browser to verify basic responsiveness.
  - [ ] Verify navigation between pages works.
  - [ ] Sanity check API error behavior (e.g., temporary offline)

## 11. Documentation & Handoff

- [ ] Update `README.md`:
  - [ ] How to install, run, test.
  - [ ] Tech choices and tradeoffs.
  - [ ] Known limitations and future improvements (e.g., full Dragons/Rockets/Missions support)
- [ ] Add screenshot of dashboard (landing + launch detail).
- [ ] Push to private GitHub repo and ensure clean commit history.
