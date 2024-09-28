
// import { useState } from 'react';
import './App.css'
import { AddMenu, Login, OrderPage, Register, RolePage, UserPage } from './Pages';
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
        <Route path="/dashboard/addmenu" element={<AddMenu />}/>
        <Route path="/dashboard/orders" element={<OrderPage />} />
      </Routes>
  )
}

export default App
