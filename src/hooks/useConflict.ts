import { useQuery } from "@tanstack/react-query";
import { fetchConflict } from "../api/absencesApi";
import type { ConflictResponse } from "../types/absence";

export function useConflict(id: number) {
  return useQuery<ConflictResponse>({
    queryKey: ["conflict", id],
    queryFn: () => fetchConflict(id),
    staleTime: 5 * 60 * 1000,
  });
}
