import { useCallback, useEffect, useState } from 'react';
import { AdminLayout } from '../Layout';
import { RoleForm, RoleTable } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { getRoles } from '../slices/user.slice';
import { debounce } from 'lodash';


const RolePage = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

const {roles} = useSelector((state) => state.user);
const dispatch = useDispatch();
useEffect(()=>{
  dispatch(getRoles(search));
},[search, dispatch])


const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

  // const handleActivateRole = (id) => {
  //   setRoles(roles.map(role => role.id === id ? { ...role, isActive: !role.isActive } : role));
  // };

  const handleViewRole = (id) => {
    alert(`Viewing details for role ID: ${id}`);
  };

  // const handleDeleteRole = (id) => {
  //   setRoles(roles.filter(role => role.id !== id));
  // };

  const handleSearch = useCallback(
    debounce((searchValue) => {
      setSearch(searchValue);
    }, 300),
    []
  );

  return (
     <AdminLayout>
          <RoleForm open={open} handleClose={handleClose} />
          <RoleTable
            roles={roles}
            handleSearch={handleSearch}
            // onActivate={handleActivateRole}
            handleOpen={handleOpen}
            onView={handleViewRole}
            // onDelete={handleDeleteRole}
          />
       </AdminLayout>
  );
};

export default RolePage;
