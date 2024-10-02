import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Visibility } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useDispatch } from "react-redux";
import { updateOrderInSlice, updateOrderStatus } from "../slices/order.slice";

const OrdersTable = ({data }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [pizzaName, setPizzaName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
console.log(data);
  const handleStatusChange = async (orderId, status) => {
    try {
       dispatch(updateOrderStatus(orderId, status)).then((res)=>{
        
      console.log('Status updated successfully:', res);
        dispatch(updateOrderInSlice({ orderId, status }));

       })
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // const handleStatusChange = async (event) => {
  //   const newStatus = event.target.value;
  //   try {
  //     setSelectedStatus(newStatus); // Optimistically update the UI with the new status
  //     dispatch(updateOrderStatus({orderId, status: newStatus })).then((res)=>{ }); // API call to update status
  //   } catch (err) {
  //     setError('Failed to update status');
  //     console.error(err);
  //   }
  // };

  const handleSetToppings = (toppingsString) => {
    const toppingsArray = toppingsString.split(',').map((t) => t.trim());
    setSelectedToppings(toppingsArray);
  };

  const handleView = async (toppings, pizzaName, quantity) => {
    handleSetToppings(toppings);
    setPizzaName(pizzaName);
    setQuantity(quantity);
    setModalOpen(true);
  };

  useEffect(() => {
    if (modalOpen) {
      console.log('Pre-render selectedToppings:', selectedToppings);
    }
  }, [selectedToppings, modalOpen]);

  console.log(selectedToppings);
  const handleClose = () => {
    setModalOpen(false);
  };
  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "pizzaName",
        Cell: ({ cell }) => <Typography>{cell.getValue()}</Typography>,
      },
      {
        header: "Topping",
        accessorKey: "toppings",
        Cell: ({ row }) => (
          <IconButton
            onClick={() =>
              handleView(
                row.original.toppings,
                row.original.pizzaName,
                row.original.quantity
              )
            } // Pass the toppings info to handleView
            sx={{
              margin: "0px",
              padding: "0px",
              fontSize: "12px",
              color: "#FF8100",
              "&:hover": { backgroundColor: "transparent" },
            }}
          >
            <Visibility /> View
          </IconButton>
        ),
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
      },
      {
        accessorKey: "customerPhoneNumber",
        header: "Customer No",
      },
      {
        accessorKey: "createdAt",
        header: "Created at",
        Cell: ({ row }) => <Typography>{moment(row.original.createdAt).format("MMM d, YYYY")}</Typography>,
      },
      {
        header: "Status",
        accessorKey: "status",
        Cell: ({ cell, row }) =>
          row.original.status === "Delivered" ? (
            <Typography>Delivered</Typography>
          ) : (
            <Select
              value={cell.getValue()}
              onChange={(e) =>
                handleStatusChange(row.original.id, e.target.value)
              }
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
              <MenuItem value={row.original.status}>
                {row.original.status}
              </MenuItem>
              <MenuItem value="Preparing">Preparing</MenuItem>
              <MenuItem value="Ready">Ready</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
            </Select>
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

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // const data = [
  //   {
  //     id: 1,
  //     name: "Pizza",
  //     topping: "Toppings",
  //     quantity: 4,
  //     customerNo: "+251 1523654789",
  //     createdAt: "2:44 PM 8/14/24",
  //     status: "Preparing",
  //   },
  //   {
  //     id: 2,
  //     name: "Pizza",
  //     topping: "Toppings",
  //     quantity: 3,
  //     customerNo: "+251 1523654789",
  //     createdAt: "2:44 PM 8/14/24",
  //     status: "Ready",
  //   },
  //   {
  //     id: 3,
  //     name: "Pizza",
  //     topping: "Toppings",
  //     quantity: 1,
  //     customerNo: "+251 1523654789",
  //     createdAt: "2:44 PM 8/14/24",
  //     status: "Delivered",
  //   },
  //   {
  //     id: 4,
  //     name: "Pizza",
  //     topping: "Toppings",
  //     quantity: 6,
  //     customerNo: "+251 1523654789",
  //     createdAt: "2:44 PM 8/14/24",
  //     status: "Preparing",
  //   },
  //   {
  //     id: 5,
  //     name: "Pizza",
  //     topping: "Toppings",
  //     quantity: 2,
  //     customerNo: "+251 1523654789",
  //     createdAt: "2:44 PM 8/14/24",
  //     status: "Delivered",
  //   },
  //   {
  //     id: 6,
  //     name: "Pizza",
  //     topping: "Toppings",
  //     quantity: 1,
  //     customerNo: "+251 1523654789",
  //     createdAt: "2:44 PM 8/14/24",
  //     status: "Delivered",
  //   },
  // ];


  const renderTopToolbarCustomActions = () => (
    <Typography sx={{ fontSize: "16px", color: "#00000099" }}>
      Packages
    </Typography>
  );

  return (
    <>
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
      <Dialog
        open={modalOpen}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: "20px",
            width: "457px",
            height: "283px",
          },
        }}
      >
        <DialogContent>
          <Box sx={{padding: "24px 47px"}}>
            <IconButton
              style={{ position: "absolute", right: "8px", top: "8px" }}
              size="small"
            >
              <CloseIcon onClick={()=>{handleClose()}}/>
            </IconButton>
            <Typography
                variant="h6"
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "22px",
                  fontWeight: 700,
                  lineHeight: "24px",
                  letterSpacing: "0.15000000596046448px",
                  textAlign: "center",
                }}
              >
                Order Details
              </Typography>
            <CardContent sx={{fontFamily: "Roboto", fontSize: "16px", display: "flex", flexDirection: "column", gap: "20px"}}>
              <Typography variant="body1" gutterBottom sx={{display: "flex", gap: "30px"}}>
              Name: <strong>{pizzaName}</strong> 
              </Typography>
              <Box sx={{display: "flex", gap: "5px"}}>
              <Typography variant="body1" gutterBottom>
              Toppings: 
              </Typography>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {selectedToppings.map((topping, index) => (
                  <Chip
                    key={index}
                    label={topping}
                    style={{
                      backgroundColor: getRandomColor(),
                      color: "#fff",
                      fontWeight: "bold",
                      width: "auto"
                    }}
                  />
                ))}
              </div>
              </Box>
              <Typography variant="body1" sx={{display: "flex", gap: "30px"}}>
              Quantity:<strong>{quantity}</strong> 
              </Typography>
            </CardContent>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrdersTable;
