import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAbsences } from "../hooks/useAbsences";
import { getEndDate } from "../api/absencesApi";
import { formatDate, formatAbsenceType } from "../utils/format";
import StatusBadge from "../components/StatusBadge/StatusBadge";
import SortableHeader from "../components/SortableHeader/SortableHeader";
import {
  sortAbsences,
  type SortField,
  type SortState,
} from "../utils/sortAbsences";
import type { Absence } from "../types/absence";

const AVATAR_COLORS = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-teal-500",
  "bg-orange-400",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-rose-500",
];

function getAvatarColor(id: string): string {
  return AVATAR_COLORS[id.charCodeAt(0) % AVATAR_COLORS.length];
}

function AbsenceRow({ absence }: { absence: Absence }) {
  const endDate = getEndDate(absence.startDate, absence.days);
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
      <td className="py-3 px-4 text-gray-700">
        {formatAbsenceType(absence.absenceType)}
      </td>
      <td className="py-3 px-4 text-gray-700 tabular-nums">
        {formatDate(absence.startDate)}
      </td>
      <td className="py-3 px-4 text-gray-700 tabular-nums">
        {formatDate(endDate.toISOString())}
      </td>
      <td className="py-3 px-4">
        <StatusBadge approved={absence.approved} />
      </td>
    </tr>
  );
}

function AbsenceCard({ absence }: { absence: Absence }) {
  const endDate = getEndDate(absence.startDate, absence.days);
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <div className="flex items-center justify-between gap-3 mb-4">
        <p className="text-sm font-semibold text-gray-900">
          {formatAbsenceType(absence.absenceType)}
        </p>
        <StatusBadge approved={absence.approved} />
      </div>
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
            Start Date
          </p>
          <p className="text-sm font-semibold text-gray-900 tabular-nums">
            {formatDate(absence.startDate)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
            End Date
          </p>
          <p className="text-sm font-semibold text-gray-900 tabular-nums">
            {formatDate(endDate.toISOString())}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function EmployeePage() {
  const { employeeId } = useParams<{ employeeId: string }>();
  const { data: absences, isPending, isError } = useAbsences();
  const [sort, setSort] = useState<SortState>({
    field: "startDate",
    direction: "desc",
  });

  function handleSort(field: SortField) {
    setSort((prev) =>
      prev.field === field
        ? { field, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { field, direction: "asc" }
    );
  }

  const employeeAbsences =
    absences?.filter((a) => a.employee.id === employeeId) ?? [];
  const sorted = sortAbsences(employeeAbsences, sort);
  const employee = employeeAbsences[0]?.employee;

  const { id = "", firstName = "", lastName = "" } = employee ?? {};
  const initials =
    firstName && lastName ? `${firstName[0]}${lastName[0]}`.toUpperCase() : "?";

  return (
    <div className="px-4 md:px-8 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-blue transition-colors mb-6 focus-visible:ring-2 focus-visible:ring-brand-blue rounded outline-none"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to all absences
      </Link>

      {isError && (
        <div
          role="alert"
          className="rounded-md bg-red-50 border border-red-200 p-4 text-sm text-red-700 mb-6"
        >
          Failed to load absences. Please refresh the page.
        </div>
      )}

      {isPending && (
        <div className="animate-pulse space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200" />
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-40" />
              <div className="h-3 bg-gray-200 rounded w-24" />
            </div>
          </div>
          <div className="h-64 bg-gray-100 rounded-lg" />
        </div>
      )}

      {!isPending && !isError && (
        <>
          <div className="flex items-center gap-4 mb-8">
            <div
              className={`w-16 h-16 rounded-full ${getAvatarColor(
                id
              )} flex items-center justify-center text-white text-xl font-bold shrink-0`}
              aria-hidden="true"
            >
              {initials}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {firstName ? `${firstName} ${lastName}` : "Unknown Employee"}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {employeeAbsences.length} absence
                {employeeAbsences.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {employeeAbsences.length === 0 ? (
            <p className="text-gray-500 text-sm py-8 text-center">
              No absences recorded for this employee.
            </p>
          ) : (
            <>
              <div className="space-y-3 md:hidden">
                {sorted.map((absence) => (
                  <AbsenceCard key={absence.id} absence={absence} />
                ))}
              </div>

              <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="min-w-full text-sm bg-white">
                  <caption className="sr-only">
                    {firstName} {lastName}'s absence history
                  </caption>
                  <thead className="bg-gray-50">
                    <tr className="border-b border-gray-200">
                      <SortableHeader
                        label="Type"
                        field="absenceType"
                        sort={sort}
                        onSort={handleSort}
                      />
                      <SortableHeader
                        label="Start Date"
                        field="startDate"
                        sort={sort}
                        onSort={handleSort}
                      />
                      <SortableHeader
                        label="End Date"
                        field="endDate"
                        sort={sort}
                        onSort={handleSort}
                      />
                      <th
                        scope="col"
                        className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sorted.map((absence) => (
                      <AbsenceRow key={absence.id} absence={absence} />
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
