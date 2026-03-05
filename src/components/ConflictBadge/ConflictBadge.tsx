interface ConflictBadgeProps {
  conflict: boolean | undefined
}

export default function ConflictBadge({ conflict }: ConflictBadgeProps) {
  if (!conflict) return null

  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5"
      role="alert"
      aria-label="Scheduling conflict"
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2L1 21h22L12 2zm0 3.5L20.5 19h-17L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z" />
      </svg>
      Conflict
    </span>
  )
}
