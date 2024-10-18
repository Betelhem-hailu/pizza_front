import { useCallback, useEffect, useState } from "react";
import { UserForm, UserTable } from "../components";
import { AdminLayout } from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { getRoles, getUsers } from "../slices/user.slice";
import { Box, Button, IconButton, MenuItem, Popover, Select } from "@mui/material";
import { debounce } from "lodash";
import FilterListIcon from '@mui/icons-material/FilterList';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import FileDownloadIcon from "@mui/icons-material/FileDownload";


const UserPage = () => {
  const [open, setOpen] = useState(false);
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [filter, setFilter] = useState({
    search: "", 
    status: "",
  });
  const {users, roles} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const openFilter = Boolean(filterAnchor);
  const id = openFilter ? 'filter-popover' : undefined;

  useEffect(() => {
      dispatch(getUsers(filter));
  }, [dispatch, filter]);

  useEffect(()=>{
    dispatch(getRoles());
  },[dispatch, open])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearch = useCallback(
    debounce((searchValue) => {
      setFilter((prev) => ({ ...prev, search: searchValue }));
    }, 300),
    []
  );
  
  const handleStatusFilter = (status) => {
    setFilter((prev) => ({ ...prev, status }));
  };
  
  const handleOpenFilter = (event) => {
    setFilterAnchor(event.currentTarget);
  };
  
  const handleCloseFilter = () => {
    setFilterAnchor(null);
  };

  const handleStatus = (event) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);
    handleCloseFilter(); 
    handleStatusFilter(newStatus);
  };

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

  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
  });

  const flattenUserData = (users) => {
    return users.map((user) => {
      const roleNames = user.Roles.map((role) => role.name).join(', ');
      return {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        createdAt: user.createdAt,
        roles: roleNames,
      };
    });
  };
  
  const handleExportData = () => {
    const flattenedData = flattenUserData(users); 
    const csv = generateCsv(csvConfig)(flattenedData); 
    download(csvConfig)(csv); 
  };

  const renderTopToolbarCustomActions = () => (
    <Box sx={{display: "flex", mb: 3}}>
        <Box sx={{ display: "flex", gap: "10px", padding: "8px" }}>
              <Button
                variant="contained"
                sx={{backgroundColor: "#FF8100", boxShadow: "none" }}
                onClick={handleOpen}
              >
                Add User
              </Button>
              <Button
              sx={{color: "#00000099"}}
                onClick={handleExportData}
                startIcon={<FileDownloadIcon />}
              >
              </Button>
        </Box>
          <IconButton onClick={handleOpenFilter}>
              <FilterListIcon />
            </IconButton>

            <Popover
              id={id}
              open={openFilter}
              anchorEl={filterAnchor}
              onClose={handleCloseFilter}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <div style={{ padding: '10px' }}>
                <Select
                  value={selectedStatus}
                  onChange={handleStatus}
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="">
                    <em>All</em>
                  </MenuItem>
                  { roles && roles.map((option) => (
                    <MenuItem key={option.id} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))} 
                </Select>
              </div>
            </Popover>
      </Box>
  ) 

  return (
    <AdminLayout>
        <UserForm open={open} handleClose={handleClose} />
        <UserTable
          users={users}
          handleOpen={handleOpen}
          handleSearch={handleSearch}
          renderTopToolbarCustomActions={renderTopToolbarCustomActions}
          // onActivate={handleActivate}
          onView={handleView}
          // onDelete={handleDelete}
        />
    </AdminLayout>
  );
};

export default UserPage;
