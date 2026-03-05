import { useAbsences } from '../hooks/useAbsences'

export default function AbsencesPage() {
  const { data: absences, isPending, isError } = useAbsences()

  if (isPending) return <p>Loading absences...</p>
  if (isError) return <p>Failed to load absences. Please try again.</p>

  return (
    <main>
      <h1>Absences</h1>
      <p>{absences.length} absence(s) found</p>
    </main>
  )
}
