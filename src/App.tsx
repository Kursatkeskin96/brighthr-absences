import { Routes, Route } from 'react-router-dom'
import AbsencesPage from './pages/AbsencesPage'
import EmployeePage from './pages/EmployeePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AbsencesPage />} />
      <Route path="/employee/:employeeId" element={<EmployeePage />} />
    </Routes>
  )
}

export default App
