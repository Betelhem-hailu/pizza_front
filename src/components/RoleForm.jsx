import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Grid2,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 510,
  height: 460,
  px: "68px",
  py: "36px",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
};

export default function RoleModal({ open, handleClose }) {
  const [permissions, setPermissions] = useState({
    updateOrderStatus: true,
    seeOrders: true,
    addUsers: true,
    seeCustomers: true,
    createRoles: false,
  });

  const handleChange = (event) => {
    setPermissions({
      ...permissions,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
          >
            Role
          </Typography>
          <TextField fullWidth label="Name" variant="outlined" sx={{ my: 2 }} />
          <Typography variant="body1">Permissions</Typography>
          <FormGroup>
            <Grid2 container spacing={2}>
                <Grid2 item xs={6} sx={{display: "flex", flexDirection: "column"}}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={permissions.updateOrderStatus}
                        onChange={handleChange}
                        name="updateOrderStatus"
                        sx={{
                          "&.Mui-checked": {
                            color: "#FF8100",
                          },
                        }}
                      />
                    }
                    label="Update Order Status"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={permissions.seeOrders}
                        onChange={handleChange}
                        name="seeOrders"
                        sx={{
                          "&.Mui-checked": {
                            color: "#FF8100",
                          },
                        }}
                      />
                    }
                    label="See Orders"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={permissions.addUsers}
                        onChange={handleChange}
                        name="addUsers"
                      />
                    }
                    label="Add Users"
                  />
                </Grid2>
                <Grid2 item xs={6} sx={{display: "flex", flexDirection: "column"}}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={permissions.seeCustomers}
                        onChange={handleChange}
                        name="seeCustomers"
                      />
                    }
                    label="See Customers"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={permissions.createRoles}
                        onChange={handleChange}
                        name="createRoles"
                      />
                    }
                    label="Create Roles"
                  />
                </Grid2>
              </Grid2>
          </FormGroup>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: "53px",width:"180px", alignContent: "center", backgroundColor: "#FF8100" }}
            onClick={handleClose}
          >
            Update
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
