import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';
import UserManagement from './components/pages/UserManagement';
import Inventory from '../src/components/pages/inventory';
import './App.css'
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginForm from './components/auth/LoginForm';
import { Register } from './components/auth/Register';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

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
          </Route>
          
          <Route path="/" element={<ProtectedRoute />} />
        </Routes>
      </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
