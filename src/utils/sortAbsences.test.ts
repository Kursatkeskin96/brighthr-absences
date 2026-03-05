import { describe, it, expect } from 'vitest'
import { sortAbsences } from './sortAbsences'
import type { Absence } from '../types/absence'

const absences: Absence[] = [
  {
    id: 1,
    startDate: '2022-06-01T00:00:00.000Z',
    days: 3,
    absenceType: 'SICKNESS',
    employee: { id: 'e1', firstName: 'Charlie', lastName: 'Brown' },
    approved: true,
  },
  {
    id: 2,
    startDate: '2022-01-15T00:00:00.000Z',
    days: 10,
    absenceType: 'ANNUAL_LEAVE',
    employee: { id: 'e2', firstName: 'Alice', lastName: 'Smith' },
    approved: false,
  },
  {
    id: 3,
    startDate: '2022-03-10T00:00:00.000Z',
    days: 2,
    absenceType: 'ANNUAL_LEAVE',
    employee: { id: 'e3', firstName: 'Bob', lastName: 'Adams' },
    approved: true,
  },
]

describe('sortAbsences', () => {
  it('sorts by startDate ascending', () => {
    const result = sortAbsences(absences, { field: 'startDate', direction: 'asc' })
    expect(result.map((a) => a.id)).toEqual([2, 3, 1])
  })

  it('sorts by startDate descending', () => {
    const result = sortAbsences(absences, { field: 'startDate', direction: 'desc' })
    expect(result.map((a) => a.id)).toEqual([1, 3, 2])
  })

  it('sorts by endDate ascending', () => {
    // id2: Jan 15 + 10 days = Jan 24
    // id3: Mar 10 + 2 days = Mar 11
    // id1: Jun 1 + 3 days = Jun 3
    const result = sortAbsences(absences, { field: 'endDate', direction: 'asc' })
    expect(result.map((a) => a.id)).toEqual([2, 3, 1])
  })

  it('sorts by absenceType ascending', () => {
    const result = sortAbsences(absences, { field: 'absenceType', direction: 'asc' })
    // ANNUAL_LEAVE < SICKNESS
    expect(result[0].absenceType).toBe('ANNUAL_LEAVE')
    expect(result[result.length - 1].absenceType).toBe('SICKNESS')
  })

  it('sorts by employeeName ascending (by first name as displayed)', () => {
    const result = sortAbsences(absences, { field: 'employeeName', direction: 'asc' })
    // Alice < Bob < Charlie
    expect(result.map((a) => a.employee.firstName)).toEqual(['Alice', 'Bob', 'Charlie'])
  })

  it('sorts by employeeName descending', () => {
    const result = sortAbsences(absences, { field: 'employeeName', direction: 'desc' })
    expect(result.map((a) => a.employee.firstName)).toEqual(['Charlie', 'Bob', 'Alice'])
  })

  it('does not mutate the original array', () => {
    const original = [...absences]
    sortAbsences(absences, { field: 'startDate', direction: 'asc' })
    expect(absences).toEqual(original)
  })
})
