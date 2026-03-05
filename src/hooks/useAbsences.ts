import { useQuery } from "@tanstack/react-query";
import { fetchAbsences } from "../api/absencesApi";
import type { Absence } from "../types/absence";

export function useAbsences() {
  return useQuery<Absence[]>({
    queryKey: ["absences"],
    queryFn: fetchAbsences,
    staleTime: 5 * 60 * 1000,
  });
}
