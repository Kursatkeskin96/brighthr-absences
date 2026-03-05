import { Link } from 'react-router-dom'
import type { Absence } from '../../types/absence'
import { getEndDate } from '../../api/absencesApi'
import StatusBadge from '../StatusBadge/StatusBadge'

interface AbsenceTableProps {
  absences: Absence[]
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatAbsenceType(type: string): string {
  return type
    .split('_')
    .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
    .join(' ')
}

const AVATAR_COLORS = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-teal-500',
  'bg-orange-400',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-emerald-500',
  'bg-rose-500',
]

function getAvatarColor(id: string): string {
  const index = id.charCodeAt(0) % AVATAR_COLORS.length
  return AVATAR_COLORS[index]
}

function AbsenceCard({ absence }: { absence: Absence }) {
  const endDate = getEndDate(absence.startDate, absence.days)
  const { firstName, lastName, id } = absence.employee
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase()

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-12 h-12 rounded-full ${getAvatarColor(id)} flex items-center justify-center text-white text-sm font-semibold shrink-0`}
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
            <p className="text-sm text-gray-500 mt-0.5">{formatAbsenceType(absence.absenceType)}</p>
          </div>
        </div>
        <span
          className={`text-xs font-bold uppercase tracking-wider shrink-0 ${
            absence.approved ? 'text-green-600' : 'text-amber-500'
          }`}
          role="status"
          aria-label={absence.approved ? 'Approved' : 'Pending approval'}
        >
          {absence.approved ? 'Approved' : 'Pending'}
        </span>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Start Date</p>
          <p className="text-sm font-semibold text-gray-900 tabular-nums">{formatDate(absence.startDate)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">End Date</p>
          <p className="text-sm font-semibold text-gray-900 tabular-nums">{formatDate(endDate.toISOString())}</p>
        </div>
      </div>
    </div>
  )
}

export default function AbsenceTable({ absences }: AbsenceTableProps) {
  if (absences.length === 0) {
    return (
      <p className="text-gray-500 text-sm py-8 text-center">No absences found.</p>
    )
  }

  return (
    <>
      {/* Mobile: card list */}
      <div className="space-y-3 md:hidden">
        {absences.map((absence) => (
          <AbsenceCard key={absence.id} absence={absence} />
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full border-collapse text-sm bg-white">
          <caption className="sr-only">Employee absences</caption>
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200">
              <th scope="col" className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee</th>
              <th scope="col" className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
              <th scope="col" className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Start Date</th>
              <th scope="col" className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">End Date</th>
              <th scope="col" className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {absences.map((absence) => {
              const endDate = getEndDate(absence.startDate, absence.days)
              const { firstName, lastName, id } = absence.employee
              const initials = `${firstName[0]}${lastName[0]}`.toUpperCase()

              return (
                <tr key={absence.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full ${getAvatarColor(id)} flex items-center justify-center text-white text-xs font-semibold shrink-0`}
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
                  <td className="py-3 px-4 text-gray-700">{formatAbsenceType(absence.absenceType)}</td>
                  <td className="py-3 px-4 text-gray-700 tabular-nums">{formatDate(absence.startDate)}</td>
                  <td className="py-3 px-4 text-gray-700 tabular-nums">{formatDate(endDate.toISOString())}</td>
                  <td className="py-3 px-4"><StatusBadge approved={absence.approved} /></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
