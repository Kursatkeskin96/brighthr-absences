import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import AbsencesPage from './pages/AbsencesPage'
import EmployeePage from './pages/EmployeePage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AbsencesPage />} />
        <Route path="/employee/:employeeId" element={<EmployeePage />} />
      </Routes>
    </Layout>
  )
}

export default App
