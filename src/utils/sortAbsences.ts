import { getEndDate } from '../api/absencesApi'
import type { Absence } from '../types/absence'

export type SortField = 'startDate' | 'endDate' | 'absenceType' | 'employeeName'
export type SortDirection = 'asc' | 'desc'

export interface SortState {
  field: SortField
  direction: SortDirection
}

export function sortAbsences(absences: Absence[], sort: SortState): Absence[] {
  return [...absences].sort((a, b) => {
    let comparison = 0

    switch (sort.field) {
      case 'startDate':
        comparison = new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        break
      case 'endDate':
        comparison =
          getEndDate(a.startDate, a.days).getTime() -
          getEndDate(b.startDate, b.days).getTime()
        break
      case 'absenceType':
        comparison = a.absenceType.localeCompare(b.absenceType)
        break
      case 'employeeName':
        comparison = `${a.employee.firstName} ${a.employee.lastName}`.localeCompare(
          `${b.employee.firstName} ${b.employee.lastName}`,
          'en',
          { sensitivity: 'base' },
        )
        break
    }

    return sort.direction === 'asc' ? comparison : -comparison
  })
}
