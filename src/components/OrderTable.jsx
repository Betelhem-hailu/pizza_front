import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Visibility } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Box,
  // Button,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  MenuItem,
  Select,
  Popover,
  // TextField,
  Typography,
} from "@mui/material";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { clearState, getOrders, updateOrderStatus } from "../slices/order.slice";
import moment from "moment";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';

const OrdersTable = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [pizzaName, setPizzaName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [filter, setFilter] = useState({
    search: "", 
    status: "", 
    startDate: null, 
    endDate: null 
  });
  const [isSelectingStart, setIsSelectingStart] = useState(true);
  const dispatch = useDispatch();
  const {orders, message} = useSelector((state) => state.order);
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [datePickerAnchor, setDatePickerAnchor] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const statusOptions = ["delivered", "ready", "preparing", "pending"];

useEffect(()=>{
  console.log(filter);
  dispatch(getOrders(filter));
},[dispatch, message, filter])

const data = orders.map(order => ({
  orderId: order.orderId,
  createdAt: order.createdAt,
  status: order.status,
  customerPhoneNumber: order.customerPhoneNumber,
  quantity: order.orderItems[0].quantity,
  pizzaName: order.orderItems[0].pizzaName,
  toppings: order.orderItems[0].toppings,
}));

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

const open = Boolean(filterAnchor);
const id = open ? 'filter-popover' : undefined;

const handleSelect = (range) => {
  if (isSelectingStart) {
  if (range?.from){ setFilter((prev) => ({...prev,startDate: moment(range.from).format('YYYY-MM-DD')}));
  setIsSelectingStart(false);
  setDatePickerAnchor(null);
}
  } else {
  if (range?.to) {setFilter((prev) => ({...prev,endDate:  moment(range.to).format('YYYY-MM-DD')}));
  setDatePickerAnchor(null);
}
  }
};


const handleInputClick = (event) => {
  setDatePickerAnchor(event.currentTarget);
};

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      dispatch(updateOrderStatus({orderId, status: newStatus })).then((res)=>{ console.log(res); });
    } catch (err) {
      dispatch(clearState());
      console.error(err);
    }
  };

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
      console.log(selectedToppings);
    }
  }, [selectedToppings, modalOpen]);

  const handleClose = () => {
    setModalOpen(false);
  };
  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "pizzaName",
        filterFn: 'fuzzy',
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
            }
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
        Cell: ({ row }) => <Typography>
          {moment(row.original.createdAt).format("MMM DD, YYYY")}
          </Typography>,
      },
      {
        header: "Status",
        accessorKey: "status",
        Cell: ({ cell, row }) =>
          row.original.status === "Delivered" ? (
            <Typography>Delivered</Typography>
          ) : (
            <Select
              value={cell.getValue() || row.original.status}
              onChange={(e) =>
                handleStatusChange(row.original.orderId, e.target.value)
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
              <MenuItem value="preparing">Preparing</MenuItem>
              <MenuItem value="ready">Ready</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
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

  const renderTopToolbarCustomActions = () => (
    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "1100px"}}>
    <Typography sx={{ fontSize: "16px", color: "#00000099"}}>
      Packages
    </Typography>
      <div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={filter.startDate}
            onClick={(event) => handleInputClick( event)}
            placeholder="Start Date"
            readOnly
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          />
          <input
            type="text"
            value={filter.endDate}
            onClick={(event) => handleInputClick( event)}
            placeholder="End Date"
            readOnly
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          />
          </div>
          <Popover
          open={Boolean(datePickerAnchor)}
          anchorEl={datePickerAnchor}
          onClose={() => setDatePickerAnchor(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <DayPicker 
          style={{ padding: '10px' }}
            mode={'range'}
            selected={{ from: filter.startDate, to: filter.endDate }}
            onSelect={handleSelect} 
          />
        </Popover>
      </div>
      <div>
      <IconButton onClick={handleOpenFilter}>
        <FilterListIcon />
      </IconButton>

      <Popover
        id={id}
        open={open}
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
            {statusOptions.map(option => (
              <MenuItem key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </div>
      </Popover>
        </div>
   </Box>
  );

  const tableOptions = {
    manualFiltering: true, 
    manualPagination: true, 
    manualSorting: false, 
    enableRowActions: false,
    enableGlobalFilter: true, 
    enableColumnFilters: false,
  };

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={data}
        {...tableOptions}
        onGlobalFilterChange={(value) => handleSearch(value)}
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
            width: "460px",
            height: "320px",
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
