import type { Absence, ConflictResponse } from '../types/absence'

const BASE_URL = 'https://front-end-kata.brighthr.workers.dev/api'

export async function fetchAbsences(): Promise<Absence[]> {
  const response = await fetch(`${BASE_URL}/absences`)
  if (!response.ok) {
    throw new Error(`Failed to fetch absences: ${response.status}`)
  }
  return response.json() as Promise<Absence[]>
}

export async function fetchConflict(id: number): Promise<ConflictResponse> {
  const response = await fetch(`${BASE_URL}/conflict/${id}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch conflict for id ${id}: ${response.status}`)
  }
  return response.json() as Promise<ConflictResponse>
}

export function getEndDate(startDate: string, days: number): Date {
  const date = new Date(startDate)
  date.setDate(date.getDate() + days - 1)
  return date
}
