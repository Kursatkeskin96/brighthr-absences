import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.webp'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    label: 'Absences',
    to: '/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <line x1="8" y1="14" x2="8" y2="14" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="12" y1="14" x2="12" y2="14" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="16" y1="14" x2="16" y2="14" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="8" y1="18" x2="8" y2="18" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="12" y1="18" x2="12" y2="18" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Employees',
    to: '/employees',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    label: 'Reports',
    to: '/reports',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="12" width="4" height="8" rx="0.5" />
        <rect x="10" y="6" width="4" height="14" rx="0.5" />
        <rect x="16" y="9" width="4" height="11" rx="0.5" />
      </svg>
    ),
  },
  {
    label: 'Settings',
    to: '/settings',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
]

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 w-56 bg-white border-r border-gray-200 flex flex-col
        transition-transform duration-200 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:z-auto
      `}
      aria-label="Sidebar"
    >
      <div className="h-16 flex items-center px-5 border-b border-gray-200">
        <img src={logo} alt="BrightHR" className="h-7 w-auto" />
      </div>

      <nav className="flex-1 py-4 px-3" aria-label="Main navigation">
        <ul className="space-y-1" role="list">
          {NAV_ITEMS.map(({ label, to, icon }) => (
            <li key={label}>
              <NavLink
                to={to}
                end={to === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-light text-brand-blue'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                {icon}
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
