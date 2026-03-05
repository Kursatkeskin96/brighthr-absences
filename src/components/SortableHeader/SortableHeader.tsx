import type { SortField, SortState } from "../../utils/sortAbsences";

interface SortableHeaderProps {
  label: string;
  field: SortField;
  sort: SortState;
  onSort: (field: SortField) => void;
}

export default function SortableHeader({
  label,
  field,
  sort,
  onSort,
}: SortableHeaderProps) {
  const isActive = sort.field === field;
  const isAsc = isActive && sort.direction === "asc";

  return (
    <th
      scope="col"
      aria-sort={isActive ? (isAsc ? "ascending" : "descending") : "none"}
      className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
    >
      <button
        type="button"
        onClick={() => onSort(field)}
        className="flex items-center gap-1 bg-transparent border-0 p-0 cursor-pointer select-none
        text-gray-500 hover:text-gray-900
        focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2
        rounded transition-colors"
      >
        {label}
        <span
          aria-hidden="true"
          className={`flex flex-col leading-none ${
            isActive ? "text-brand-blue" : "text-gray-300"
          }`}
        >
          <svg
            width="8"
            height="5"
            viewBox="0 0 8 5"
            fill="currentColor"
            className={isAsc ? "text-brand-blue" : "text-gray-300"}
          >
            <path d="M4 0L8 5H0L4 0Z" />
          </svg>
          <svg
            width="8"
            height="5"
            viewBox="0 0 8 5"
            fill="currentColor"
            className={!isAsc && isActive ? "text-brand-blue" : "text-gray-300"}
          >
            <path d="M4 5L0 0H8L4 5Z" />
          </svg>
        </span>
      </button>
    </th>
  );
}
