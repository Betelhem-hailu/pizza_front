import { useState } from "react";
import { UserForm, UserTable } from "../components";
import { AdminLayout } from "../Layout";

const UserPage = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Abebe Bekele",
      phone: "+251 1523654789",
      email: "thisis@gmail.com",
      isActive: true,
    },
  ]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleActivate = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  const handleView = (id) => {
    console.log(`View details for user id: ${id}`);
  };

  const handleDelete = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <AdminLayout>
        <UserForm open={open} handleClose={handleClose} />
        <UserTable
          users={users}
          handleOpen={handleOpen}
          onActivate={handleActivate}
          onView={handleView}
          onDelete={handleDelete}
        />
    </AdminLayout>
  );
};

export default UserPage;
