import {MaterialReactTable} from 'material-react-table';
import { styled, alpha, Box, Button, IconButton, Switch, Typography } from '@mui/material';
import { Visibility, Delete } from '@mui/icons-material';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const ActiveSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: "#008000",
    '&:hover': {
      backgroundColor: alpha("#008000", theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: "#00800033",
  },
  '& .MuiSwitch-switchBase': {
    color: "#FF0000",
    '&:hover': {
      backgroundColor: alpha("#FF0000", theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-track': {
    backgroundColor: "#FF000033",
  },
}));

const RoleTable = ({ roles, onActivate, onView, onDelete, handleOpen }) => {
  const columns = [
    {
      accessorKey: 'roleName',
      header: 'Role Name',
    },
    {
      accessorKey: 'createdAt',
      header: 'Created at',
    },
    {
      accessorKey: 'isActive',
      header: 'Actions',
      Cell: ({ row }) => (
        <Box sx={{
          display: 'flex',
          alignItems: 'center'}}>
        <Box 
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100px',
          backgroundColor: row.original.isActive ? '#0080001A' : '#f8d7da', // Light green for active, light red for inactive
          padding: '4px 8px',
          borderRadius: '15px',
          marginRight: '8px',
        }}>
          <Typography sx={{ marginRight: '8px', fontSize: '12px' }}>
            {row.original.isActive ? 'Active' : 'Inactive'}
          </Typography>
          <ActiveSwitch
            checked={row.original.isActive}
            onChange={() => onActivate(row.original.id)}
            size="small"
          />
        </Box>
        <IconButton onClick={() => onView(row.original.id)}>
        <Visibility />
      </IconButton>
    <IconButton onClick={() => onDelete(row.original.id)}>
      <Delete />
    </IconButton>
    </Box>
      ),
    },
  ];

  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
  });

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(roles);
    download(csvConfig)(csv);
  };

  const renderTopToolbarCustomActions = () => (
    <Box
      sx={{
        display: 'flex',
        gap: '16px',
        padding: '8px',
        flexWrap: 'wrap',
        width: '100%',
      }}
    >
      <Button type="submit" variant="contained" sx={{backgroundColor:"#FF8100", boxShadow: "none"}} onClick={handleOpen}>
        Add Role
      </Button>
      <Button
        onClick={handleExportData}
        startIcon={<FileDownloadIcon />}
      >
      </Button>
    </Box>
  );

  return (
    <MaterialReactTable
    sx={{ boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)'}}
      columns={columns}
      data={roles}
      renderTopToolbarCustomActions={renderTopToolbarCustomActions}
      enablePagination={false}
    />
  );
};

export default RoleTable;

// import { useMemo } from 'react';
// import {MaterialReactTable,  useMaterialReactTable } from 'material-react-table';
// import { IconButton, Switch } from '@mui/material';
// import { Visibility, Delete } from '@mui/icons-material';

// const RoleTable = ({ roles, onActivate, onView, onDelete }) => {
//   // Define the columns using useMemo for optimization
//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: 'roleName', // Accessor for the 'roleName' field
//         header: 'Role Name',
//         muiTableHeadCellProps: { style: { color: 'green' } }, // Custom header style
//       },
//       {
//         accessorKey: 'createdAt', // Accessor for the 'createdAt' field
//         header: 'Created at',
//         // Custom cell render for date formatting if needed
//         Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(), 
//       },
//       {
//         accessorKey: 'isActive', // Accessor for the 'isActive' field
//         header: 'Actions',
//         Cell: ({ row }) => (
//           <>
//             <Switch
//               checked={row.original.isActive}
//               onChange={() => onActivate(row.original.id)}
//             />
//             <IconButton onClick={() => onView(row.original.id)}>
//               <Visibility />
//             </IconButton>
//             <IconButton onClick={() => onDelete(row.original.id)}>
//               <Delete />
//             </IconButton>
//           </>
//         ),
//       },
//     ],
//     [onActivate, onView, onDelete] // Ensure columns are memoized
//   );

//   // Initialize table using useMaterialReactTable
//   const table = useMaterialReactTable({
//     columns, // Pass in the memoized columns
//     data: roles, // Must be a stable value (i.e., memoized or state-managed)
//     enableRowSelection: false, // Disable row selection if not needed
//     enableColumnOrdering: true, // Enable reordering columns
//     enableGlobalFilter: false, // Disable global filtering
//   });

//   return <MaterialReactTable table={table} />;
// };

// export default RoleTable;

