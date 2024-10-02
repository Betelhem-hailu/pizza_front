import { useEffect, useState } from "react";
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
import { createRole, getPermissions } from "../slices/user.slice";
import { useDispatch, useSelector } from "react-redux";

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
  const dispatch = useDispatch();
  const [roleName, setRoleName] = useState("");
  const [permissionState, setPermissionState] = useState({});
  const { permissions } = useSelector((state) => state.user);

  useEffect(() => {
    if (open) {
      dispatch(getPermissions());
    }
  }, [open, dispatch]);

  useEffect(() => {
    if (permissions) {
      // Initialize permissions state based on available permissions
      const permissionsState = permissions.reduce((acc, permission) => {
        acc[permission.id] = false; // Set all permissions to false initially
        return acc;
      }, {});
      setPermissionState(permissionsState);
    }
  }, [permissions]);

  // Handle checkbox changes
  const handleChange = (event) => {
    const { name, checked } = event.target;
    setPermissionState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  // Handle form submit
  const handleSubmit = () => {
    // Get selected permission IDs
    const selectedPermissionIds = Object.keys(permissionState).filter(
      (permId) => permissionState[permId] === true
    );


    // Dispatch the createRole action
    dispatch(createRole({ roleName, permissionIds: selectedPermissionIds }))
    .unwrap()
    .then(() => {
    console.log("success");
    });

    // Close the modal after submission
    handleClose();
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
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            sx={{ my: 2 }}
          />
          <Typography variant="body1">Permissions</Typography>
          <FormGroup>
            <Grid2 container spacing={2}>
              {permissions &&
                permissions.map((permission) => (
                  <Grid2 item xs={6} key={permission.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={permissionState[permission.id] || false}
                          onChange={handleChange}
                          name={permission.id.toString()} 
                          sx={{
                            "&.Mui-checked": {
                              color: "#FF8100",
                            },
                          }}
                        />
                      }
                      label={permission.name} 
                    />
                  </Grid2>
                ))}
            </Grid2>
          </FormGroup>
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: "53px",
              width: "180px",
              alignContent: "center",
              backgroundColor: "#FF8100",
            }}
            onClick={handleSubmit}
          >
            Update
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
