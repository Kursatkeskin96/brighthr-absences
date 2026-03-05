import { useAbsences } from '../hooks/useAbsences'
import AbsenceTable from "../components/AbsenceTable/AbsenceTable";

function TableSkeleton() {
  return (
    <>
      {/* Mobile card skeletons */}
      <div
        className="space-y-3 md:hidden"
        aria-busy="true"
        aria-label="Loading absences"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 animate-pulse"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-32" />
                  <div className="h-3 bg-gray-200 rounded w-20" />
                </div>
              </div>
              <div className="h-3 bg-gray-200 rounded w-16" />
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-2 bg-gray-200 rounded w-16" />
                <div className="h-4 bg-gray-200 rounded w-24" />
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-gray-200 rounded w-16" />
                <div className="h-4 bg-gray-200 rounded w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table skeleton */}
      <div
        className="hidden md:block rounded-lg border border-gray-200 shadow-sm overflow-hidden"
        aria-busy="true"
        aria-label="Loading absences"
      >
        <div className="bg-gray-50 border-b border-gray-200 h-10" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex gap-4 px-4 py-3 border-b border-gray-100 animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-36" />
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-4 bg-gray-200 rounded w-16" />
          </div>
        ))}
      </div>
    </>
  );
}

export default function AbsencesPage() {
  const { data: absences, isPending, isError } = useAbsences()

  return (
    <div className="px-4 md:px-8 py-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Absence Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Overview of all current and upcoming leave requests.
          </p>
        </div>
      </div>

      {isError && (
        <div
          role="alert"
          className="rounded-md bg-red-50 border border-red-200 p-4 text-sm text-red-700 mb-6"
        >
          Failed to load absences. Please refresh the page.
        </div>
      )}

      {isPending && <TableSkeleton />}

      {absences && <AbsenceTable absences={absences} />}
    </div>
  );
}
