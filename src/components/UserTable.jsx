import { MaterialReactTable } from "material-react-table";
import { alpha, Box, IconButton, styled, Switch, Typography } from "@mui/material";
import { Visibility, Delete } from "@mui/icons-material";
// import { mkConfig, generateCsv, download } from 'export-to-csv';
// import FileDownloadIcon from "@mui/icons-material/FileDownload";

const ActiveSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#008000",
    "&:hover": {
      backgroundColor: alpha("#008000", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#00800033",
  },
  "& .MuiSwitch-switchBase": {
    color: "#FF0000",
    "&:hover": {
      backgroundColor: alpha("#FF0000", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-track": {
    backgroundColor: "#FF000033",
  },
}));

const UserTable = ({ users, onActivate, onView, onDelete, handleSearch, renderTopToolbarCustomActions }) => {
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone No",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "isActive",
      header: "Actions",
      Cell: ({ row }) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100px",
              backgroundColor: row.original.isActive ? "#0080001A" : "#f8d7da",
              padding: "4px 8px",
              borderRadius: "15px",
              marginRight: "8px",
            }}
          >
            <Typography sx={{ marginRight: "8px", fontSize: "12px" }}>
              {row.original.isActive ? "Active" : "Inactive"}
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

  // const csvConfig = mkConfig({
  //   fieldSeparator: ',',
  //   decimalSeparator: '.',
  //   useKeysAsHeaders: true,
  // });

  // const handleExportData = () => {
  //   const csv = generateCsv(csvConfig)(users);
  //   download(csvConfig)(csv);
  // };
  const tableOptions = {
    manualFiltering: true, 
    manualPagination: true, 
    manualSorting: false, 
    enableRowActions: false,
    enableGlobalFilter: true, 
    enableColumnFilters: false,
  };

  return (
    <MaterialReactTable
      columns={columns}
      data={users}
      {...tableOptions}
      enablePagination={false}
      sx={{ boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)" }}
      onGlobalFilterChange={(value) => handleSearch(value)}
      renderTopToolbarCustomActions={renderTopToolbarCustomActions}
    />
  );
};

export default UserTable;
