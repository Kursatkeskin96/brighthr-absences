# BrightHR Absences

A single page application that displays employee absences fetched from the BrightHR kata API.

## Tech stack

- React
- TypeScript
- Vite
- TanStack Query (React Query)
- React Router
- Tailwind CSS
- Vitest + React Testing Library

## Getting started

**Install dependencies**

```bash
npm install
```

**Run the development server**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

**Build for production**

```bash
npm run build
```

## Running tests

**Run all tests (watch mode)**

```bash
npm test
```

**Run tests once with coverage**

```bash
npm run test:coverage
```

## What's implemented

- **Absences table** — displays all employee absences with start date, end date, employee name, absence type, and approval status. Responsive: card layout on mobile, table on desktop.
- **Sortable columns** — click any column header to sort ascending/descending. Supported fields: employee name, absence type, start date, end date.
- **Conflict indicators** — each row shows a warning badge if the absence has a scheduling conflict, fetched in parallel using React Query's `useQueries`.
- **Employee detail view** — clicking an employee name navigates to `/employee/:id`, showing only their absences with the same sortable table. Data is served from the React Query cache — no extra API call.
- **Loading skeletons** — animated placeholder UI shown while data is fetching.
- **Error states** — inline error messages with `role="alert"` for screen readers.
- **Accessibility** — `aria-sort` on sortable headers, `scope="col"` on all column headers, `role="status"` on status badges

## Architecture notes

- **React Query** is used for data fetching and caching. This allows the employee detail view to reuse the absences data already fetched on the main page without triggering another API request.
- **Conflict detection** is fetched via a separate endpoint using `useQueries` to run requests in parallel while still benefiting from caching.
- **Sorting** is implemented as a pure utility (`sortAbsences`) to keep UI components simple and allow isolated unit testing.

## Notes on end date calculation

The API does not return an `endDate`. It is derived client-side using the `startDate` and `days` fields.

The implementation assumes `days` represents consecutive calendar days rather than working days. In a production system this logic would ideally live on the API to avoid duplicating business rules across clients.

## What I would add with more time

**Filtering** — a search/filter bar to narrow absences by employee name, type, or date range. The data is already client-side so this would be purely UI state.

**Conflict indicators on the employee page** — the employee detail view currently omits conflict badges. The `useConflicts` hook already handles parallel fetching; it would be straightforward to wire it in.

**End-to-end tests** — Playwright tests covering the core user journeys: loading the absence list, sorting a column, navigating to an employee, and returning to the list.

**Pagination or virtualisation** — for large datasets, rendering all rows at once will degrade performance. React Query supports cursor-based pagination; alternatively, `@tanstack/react-virtual` could virtualise the list without API changes.

**Storybook** — isolated stories for `StatusBadge`, `ConflictBadge`, `SortableHeader`, and `AbsenceCard` to document component states and support visual regression testing.

**More granular loading states** — conflict badges currently appear only after all conflict queries resolve for a given row. Per-row loading skeletons (using the `isPending` flag from each individual query result) would give a more responsive feel.
