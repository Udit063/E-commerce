import { Route, Routes } from 'react-router-dom'
import Admin from '../admin/Admin'

const AdminRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<Admin />} />
      </Routes>
    </div>
  )
}

export default AdminRoutes
