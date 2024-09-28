import { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Visibility } from "@mui/icons-material";
import {
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const OrdersTable = ({ onView }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name", //accessorKey refers to the property in the data
        header: "Name",
        Cell: ({ cell }) => <Typography>{cell.getValue()}</Typography>, //Custom Cell
      },
      {
        accessorKey: "topping",
        header: "Topping",
        Cell: () => (
          <IconButton
            onClick={() => onView()}
            sx={{
              margin: "0px",
              padding: "0px",
              fontSize: "12px",
              color: "#FF8100",
              "&:hover": { backgroundColor: "transparent" },
            }}
          >
            <Visibility /> Toppings
          </IconButton>
        ),
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
      },
      {
        accessorKey: "customerNo",
        header: "Customer No",
      },
      {
        accessorKey: "createdAt",
        header: "Created at",
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell, row }) => (
                (row.original.status === "Delivered") ? (
                  <Typography>Delivered</Typography>
                ) : (
                  <Select
                    value={cell.getValue()}
                    onChange={(e) => handleStatusChange(row.original.id, e.target.value)}
                    displayEmpty
                    fullWidth
                    sx={{
                      "& .MuiSelect-select": {
                        padding: "4px 10px",
                        backgroundColor: getStatusColor(cell.getValue()),
                        border: "none",
                        "&.Mui-focused": {
                          border: "none",
                        },
                      },
                    }}
                  >
                    <MenuItem value="Preparing">Preparing</MenuItem>
                    <MenuItem value="Ready">Ready</MenuItem>
                  </Select>
                )
        ),
      },
    ],
    []
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Preparing":
        return "#FFA500";
      case "Ready":
        return "#008000";
      default:
        return "#FFFFFF";
    }
  };

  const data = [
    {
      id: 1,
      name: "Pizza",
      topping: "Toppings",
      quantity: 4,
      customerNo: "+251 1523654789",
      createdAt: "2:44 PM 8/14/24",
      status: "Preparing",
    },
    {
      id: 2,
      name: "Pizza",
      topping: "Toppings",
      quantity: 3,
      customerNo: "+251 1523654789",
      createdAt: "2:44 PM 8/14/24",
      status: "Ready",
    },
    {
      id: 3,
      name: "Pizza",
      topping: "Toppings",
      quantity: 1,
      customerNo: "+251 1523654789",
      createdAt: "2:44 PM 8/14/24",
      status: "Delivered",
    },
    {
      id: 4,
      name: "Pizza",
      topping: "Toppings",
      quantity: 6,
      customerNo: "+251 1523654789",
      createdAt: "2:44 PM 8/14/24",
      status: "Preparing",
    },
    {
      id: 5,
      name: "Pizza",
      topping: "Toppings",
      quantity: 2,
      customerNo: "+251 1523654789",
      createdAt: "2:44 PM 8/14/24",
      status: "Delivered",
    },
    {
      id: 6,
      name: "Pizza",
      topping: "Toppings",
      quantity: 1,
      customerNo: "+251 1523654789",
      createdAt: "2:44 PM 8/14/24",
      status: "Delivered",
    },
  ];

  const handleStatusChange = (id, status) => {
    console.log(`Status changed for row ${id} to ${status}`);
    // Implement logic for status change
  };

  const renderTopToolbarCustomActions = () => (
    <Typography sx={{ fontSize: "16px", color: "#00000099" }}>
      Packages
    </Typography>
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowActions={false}
      enableColumnResizing={false}
      enableSorting={false}
      enableColumnOrdering={false}
      enablePagination={false}
      renderTopToolbarCustomActions={renderTopToolbarCustomActions}
      muiTableBodyCellProps={{
        sx: {
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      }}
    />
  );
};

export default OrdersTable;
