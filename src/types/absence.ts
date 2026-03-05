export interface Employee {
  id: string
  firstName: string
  lastName: string
}

export interface Absence {
  id: number
  startDate: string
  days: number
  absenceType: string
  employee: Employee
  approved: boolean
}

export interface ConflictResponse {
  conflicts: boolean
}
