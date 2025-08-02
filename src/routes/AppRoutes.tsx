import { Routes, Route, Navigate } from 'react-router-dom'
import { authRoutes } from '../pages/auth/routes/auth'
import InventoryPage from '@/pages/inventory'
import EditItem from '@/pages/inventory/pages/edit/[id]/editItem'
import AddItem from '@/pages/inventory/pages/add/addItem'
import InventoryHistory from '@/pages/inventory/pages/history/inventoryHistory'
import TransactionList from '@/pages/inventory/pages/transaction/transactionList'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/" replace />} />
      {authRoutes}
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/inventory/add" element={<AddItem />} />
      <Route path="/inventory/edit/:id" element={<EditItem />} />
      <Route path="/inventory/history" element={<InventoryHistory />} />
      <Route path="/inventory/transaction" element={<TransactionList />} />
      {/* Route lain bisa ditambahkan di sini */}
    </Routes>
  )
}
