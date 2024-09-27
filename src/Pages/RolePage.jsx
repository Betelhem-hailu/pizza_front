import { useState } from 'react';
import { AdminLayout } from '../Layout';
import { RoleForm, RoleTable } from '../components';


const RolePage = () => {
  const [open, setOpen] = useState(false);
  const [roles, setRoles] = useState([
    { id: 1, roleName: 'Kitchen Manager', createdAt: '8/14/24', isActive: true },
    { id: 2, roleName: 'Cashier', createdAt: '8/14/24', isActive: true },
    { id: 3, roleName: 'Branch Manager', createdAt: '8/14/24', isActive: true },
  ]);

//   const handleAddRole = (newRole) => {
//     setRoles([...roles, { ...newRole, id: roles.length + 1, createdAt: new Date().toLocaleDateString(), isActive: true }]);
//   };


const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

  const handleActivateRole = (id) => {
    setRoles(roles.map(role => role.id === id ? { ...role, isActive: !role.isActive } : role));
  };

  const handleViewRole = (id) => {
    alert(`Viewing details for role ID: ${id}`);
  };

  const handleDeleteRole = (id) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  return (
     <AdminLayout>
          <RoleForm open={open} handleClose={handleClose} />
          <RoleTable
            roles={roles}
            onActivate={handleActivateRole}
            handleOpen={handleOpen}
            onView={handleViewRole}
            onDelete={handleDeleteRole}
          />
       </AdminLayout>
  );
};

export default RolePage;
