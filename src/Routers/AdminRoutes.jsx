import { Route, Routes } from 'react-router-dom'
import Admin from '../admin/Admin'
import RequireAdmin from './RequireAdmin'

const AdminRoutes = () => {
  return (
    <RequireAdmin>
      <Routes>
        <Route path="/*" element={<Admin />} />
      </Routes>
    </RequireAdmin>
  )
}

export default AdminRoutes
