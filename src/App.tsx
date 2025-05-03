import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard/index';
import UserManagement from './pages/UserManagement';
import Inventory from './pages/inventory/index';
import Purchase from './pages/purchase';
import './App.css'
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginForm from './components/auth/LoginForm';
import { Register } from './components/auth/Register';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "sonner"
import Sell from './pages/sell';
// import { AddMedicineDialog } from './components/pages/inventory/components/AddMedicine';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/users" element={<UserManagement />} />
              <Route path="/dashboard/inventory" element={<Inventory />} />
              <Route path="/dashboard/purchase" element={<Purchase />} />
              <Route path="/dashboard/sell" element={<Sell />} />
              {/* <Route path="/dashboard/inventory/add" element={<AddMedicineDialog open={true} onOpenChange={() => {}} />} />
              <Route path="/dashboard/inventory/edit/:id" element={<AddMedicineDialog open={true} onOpenChange={() => {}} />} /> */}
            </Route>
            
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
