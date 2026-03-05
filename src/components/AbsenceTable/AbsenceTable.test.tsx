import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AbsenceTable from "./AbsenceTable";
import type { Absence } from "../../types/absence";

const mockAbsences: Absence[] = [
  {
    id: 1,
    startDate: "2022-05-02T00:00:00.000Z",
    days: 3,
    absenceType: "ANNUAL_LEAVE",
    employee: { id: "emp-1", firstName: "Jane", lastName: "Doe" },
    approved: true,
  },
  {
    id: 2,
    startDate: "2022-06-10T00:00:00.000Z",
    days: 5,
    absenceType: "SICKNESS",
    employee: { id: "emp-2", firstName: "John", lastName: "Smith" },
    approved: false,
  },
];

function renderTable(absences: Absence[] = mockAbsences) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <AbsenceTable absences={absences} />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe("AbsenceTable", () => {
  it("renders entries for each absence", () => {
    renderTable();
    expect(screen.getAllByText("Jane Doe").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("John Smith").length).toBeGreaterThanOrEqual(1);
  });

  it("formats absence type from snake_case to title case", () => {
    renderTable();
    expect(screen.getAllByText("Annual Leave").length).toBeGreaterThanOrEqual(
      1
    );
    expect(screen.getAllByText("Sickness").length).toBeGreaterThanOrEqual(1);
  });

  it("shows Approved status for approved absences", () => {
    renderTable();
    expect(screen.getAllByLabelText("Approved").length).toBeGreaterThanOrEqual(
      1
    );
  });

  it("shows Pending status for unapproved absences", () => {
    renderTable();
    expect(
      screen.getAllByLabelText("Pending approval").length
    ).toBeGreaterThanOrEqual(1);
  });

  it("links employee name to their employee page", () => {
    renderTable();
    const links = screen.getAllByRole("link", { name: "Jane Doe" });
    expect(links.length).toBeGreaterThanOrEqual(1);
    expect(links[0]).toHaveAttribute("href", "/employee/emp-1");
  });

  it("renders an empty state when no absences are provided", () => {
    renderTable([]);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("No absences found.")).toBeInTheDocument();
  });
});
