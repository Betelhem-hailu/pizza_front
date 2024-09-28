import { useEffect, useState } from "react";
import { UserForm, UserTable } from "../components";
import { AdminLayout } from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../slices/user.slice";

const UserPage = () => {
  const [open, setOpen] = useState(false);
 

  const {users} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!users.length) {
      dispatch(getUsers());
    }
  }, [dispatch]);
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const handleActivate = (id) => {
  //   setUsers((prevUsers) =>
  //     prevUsers.map((user) =>
  //       user.id === id ? { ...user, isActive: !user.isActive } : user
  //     )
  //   );
  // };

  const handleView = (id) => {
    console.log(`View details for user id: ${id}`);
  };

  // const handleDelete = (id) => {
  //   setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  // };

  return (
    <AdminLayout>
        <UserForm open={open} handleClose={handleClose} />
        <UserTable
          users={users}
          handleOpen={handleOpen}
          // onActivate={handleActivate}
          onView={handleView}
          // onDelete={handleDelete}
        />
    </AdminLayout>
  );
};

export default UserPage;
