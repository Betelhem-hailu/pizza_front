
// import { useState } from 'react';
import './App.css'
import { Login, Register, RolePage, UserPage } from './Pages';
import { AdminLayout } from './Layout';
import { Route, Routes } from 'react-router-dom';


function App() {
  // const [user, setUser] = useState(null); 
  return (
      <Routes>
        <Route path="/register" element={<Register />} />
        {/* <Route path="/login" element={<Login setUser={setUser} />} /> */}
        <Route path="/login" element={<Login />} />

        {/* Role-based routes */}
        <Route 
          path="/dashboard" 
          element={
            // <PrivateRoute user={user}>
              <AdminLayout />
            // </PrivateRoute>
          } 
        />
        
        <Route path="/dashboard/roles" element={<RolePage />} />
        <Route path="/dashboard/users" element={<UserPage />} />
      </Routes>
  )
}

export default App
