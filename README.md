# SpaceX Launch Dashboard

A small SpaceX launch analytics dashboard built with React and TypeScript using the SpaceX GraphQL API. The goal is to demonstrate frontend architecture, data modeling, and UX within a limited time-box.

---

## Features

- Landing page with 4 cards:
  - Launches
  - Dragons
  - Rockets
  - Missions
- Launch detail page:
  - Time-based bar chart showing number of launches by year
  - Paginated launches table (10 rows per page by default)
  - Option to change number of rows per page (bonus requirement)
- Basic client-side routing between dashboard and launch detail page
- Loading, empty, and error states that handle a slow or flaky API
- Simple, responsive layout

---

## Tech stack

- React (functional components + hooks)
- TypeScript
- Vite (build tool and dev server)
- GraphQL client (graphql-request or Apollo Client)
- Chart library (for the launches-by-year bar chart)
- Styling: Tailwind CSS or a lightweight component library

---

## Getting started

### Prerequisites

- Node.js (LTS version)
- npm or yarn

### Installation

`npm install` or `yarn`

### Running the app

`npm run dev` or `yarn dev`

### Run tests with:

`npm test`

## Assumptions and tradeoffs

TBD

## If I had more time

TBD
