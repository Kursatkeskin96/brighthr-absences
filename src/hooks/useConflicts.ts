import { useQueries } from '@tanstack/react-query'
import { fetchConflict } from '../api/absencesApi'

export function useConflicts(ids: number[]): Map<number, boolean> {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ['conflict', id],
      queryFn: () => fetchConflict(id),
      staleTime: 5 * 60 * 1000,
    })),
  })

  const map = new Map<number, boolean>()
  ids.forEach((id, i) => {
    const data = results[i].data
    if (data !== undefined) {
      map.set(id, data.conflicts)
    }
  })
  return map
}
