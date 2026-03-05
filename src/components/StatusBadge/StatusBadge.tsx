interface StatusBadgeProps {
  approved: boolean
}

export default function StatusBadge({ approved }: StatusBadgeProps) {
  return (
    <span
      role="status"
      aria-label={approved ? 'Approved' : 'Pending approval'}
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
        approved
          ? 'bg-green-100 text-green-800'
          : 'bg-yellow-100 text-yellow-800'
      }`}
    >
      {approved ? 'Approved' : 'Pending'}
    </span>
  )
}
