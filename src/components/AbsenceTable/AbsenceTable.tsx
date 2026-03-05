import { useState } from "react";
import { Link } from "react-router-dom";
import type { Absence } from "../../types/absence";
import { getEndDate } from "../../api/absencesApi";
import StatusBadge from "../StatusBadge/StatusBadge";
import SortableHeader from "../SortableHeader/SortableHeader";
import {
  sortAbsences,
  type SortField,
  type SortState,
} from "../../utils/sortAbsences";
import { formatDate, formatAbsenceType } from "../../utils/format";
import { useConflicts } from "../../hooks/useConflicts";
import ConflictBadge from "../ConflictBadge/ConflictBadge";

interface AbsenceTableProps {
  absences: Absence[];
}

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
  const index = id.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

function AbsenceCard({ absence }: { absence: Absence }) {
  const endDate = getEndDate(absence.startDate, absence.days);
  const { firstName, lastName, id } = absence.employee;
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-12 h-12 rounded-full ${getAvatarColor(
              id
            )} flex items-center justify-center text-white text-sm font-semibold shrink-0`}
            aria-hidden="true"
          >
            {initials}
          </div>
          <div className="min-w-0">
            <Link
              to={`/employee/${id}`}
              className="font-semibold text-gray-900 hover:text-brand-blue hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded truncate block"
            >
              {firstName} {lastName}
            </Link>
            <p className="text-sm text-gray-500 mt-0.5">
              {formatAbsenceType(absence.absenceType)}
            </p>
          </div>
        </div>
        <span
          className={`text-xs font-bold uppercase tracking-wider shrink-0 ${
            absence.approved ? "text-green-600" : "text-amber-500"
          }`}
          role="status"
          aria-label={absence.approved ? "Approved" : "Pending approval"}
        >
          {absence.approved ? "Approved" : "Pending"}
        </span>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
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

function AbsenceTableRow({ absence, conflict }: { absence: Absence; conflict: boolean | undefined }) {
  const endDate = getEndDate(absence.startDate, absence.days);
  const { firstName, lastName, id } = absence.employee;
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full ${getAvatarColor(
              id
            )} flex items-center justify-center text-white text-xs font-semibold shrink-0`}
            aria-hidden="true"
          >
            {initials}
          </div>
          <Link
            to={`/employee/${id}`}
            className="font-medium text-gray-900 hover:text-brand-blue hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
          >
            {firstName} {lastName}
          </Link>
        </div>
      </td>
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
      <td className="py-3 px-4">
        <ConflictBadge conflict={conflict} />
      </td>
    </tr>
  );
}

export default function AbsenceTable({ absences }: AbsenceTableProps) {
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

  const conflicts = useConflicts(absences.map((a) => a.id));
  const sorted = sortAbsences(absences, sort);

  if (absences.length === 0) {
    return (
      <p className="text-gray-500 text-sm py-8 text-center">
        No absences found.
      </p>
    );
  }

  return (
    <>
      <div className="space-y-3 md:hidden">
        {sorted.map((absence) => (
          <AbsenceCard key={absence.id} absence={absence} />
        ))}
      </div>

      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full text-sm bg-white">
          <caption className="sr-only">
            Employee absences — sortable by column header
          </caption>
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200">
              <SortableHeader
                label="Employee"
                field="employeeName"
                sort={sort}
                onSort={handleSort}
              />
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
              <th
                scope="col"
                className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Conflicts
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((absence) => (
              <AbsenceTableRow
                key={absence.id}
                absence={absence}
                conflict={conflicts.get(absence.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
