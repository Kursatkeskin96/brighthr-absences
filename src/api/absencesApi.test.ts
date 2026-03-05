import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchAbsences, fetchConflict, getEndDate } from "./absencesApi";
import type { Absence } from "../types/absence";

const BASE_URL = "https://front-end-kata.brighthr.workers.dev/api";

const mockAbsences: Absence[] = [
  {
    id: 0,
    startDate: "2022-05-28T04:39:06.470Z",
    days: 9,
    absenceType: "SICKNESS",
    employee: { firstName: "Rahaf", lastName: "Deckard", id: "abc-123" },
    approved: true,
  },
];

beforeEach(() => {
  vi.resetAllMocks();
});

describe("fetchAbsences", () => {
  it("returns parsed absences on success", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockAbsences),
      })
    );

    const result = await fetchAbsences();
    expect(result).toEqual(mockAbsences);
    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/absences`);
  });

  it("throws on non-ok response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500 })
    );

    await expect(fetchAbsences()).rejects.toThrow(
      "Failed to fetch absences: 500"
    );
  });
});

describe("fetchConflict", () => {
  it("returns conflict status for given id", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ conflicts: true }),
      })
    );

    const result = await fetchConflict(5);
    expect(result).toEqual({ conflicts: true });
    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/conflict/5`);
  });

  it("throws on non-ok response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 404 })
    );

    await expect(fetchConflict(99)).rejects.toThrow(
      "Failed to fetch conflict for id 99: 404"
    );
  });
});

describe("getEndDate", () => {
  it("calculates end date from start date and days", () => {
    const end = getEndDate("2022-05-28T00:00:00.000Z", 9);
    expect(end.getUTCDate()).toBe(5);
    expect(end.getUTCMonth()).toBe(5);
    expect(end.getUTCFullYear()).toBe(2022);
  });

  it("returns same day for 1-day absence", () => {
    const end = getEndDate("2022-05-28T00:00:00.000Z", 1);
    expect(end.getUTCDate()).toBe(28);
    expect(end.getUTCMonth()).toBe(4);
  });
});
