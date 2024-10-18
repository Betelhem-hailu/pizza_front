import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Modal,
  Box,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getRoles, registerAdmin } from "../slices/user.slice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 655,
  height: 580,
  px: "68px",
  py: "36px",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
};

const UserForm = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    phoneNumber: "",
    password: "",
    role: "",
  });
  const dispatch = useDispatch();
  const { roles } = useSelector((state) => state.user);

  useEffect(() => {
    if (open) {
      dispatch(getRoles());
    }
  }, [open, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const userData = {
    name: formData.name,
    email: formData.email,
    location: formData.location,
    phoneNumber: formData.phoneNumber,
    password: formData.password,
    roleName: formData.role,
  }

  const handleSubmit = () => {
    dispatch(registerAdmin(userData))
    .unwrap()
    .then(() => {
    console.log("success");
    });

    // Close the modal after submission
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          height="30px"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email address"
          name="email"
          height="30px"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Location"
          name="location"
          height="30px"
          value={formData.location}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Phone Number"
          name="phoneNumber"
          height="30px"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="password"
          name="password"
          height="30px"
          value={formData.password}
          onChange={handleChange}
        />
        <Grid
          container
          spacing={10}
          sx={{ display: "flex", alignItems: "bottom" }}
        >
          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Select Role</InputLabel>
              <Select name="role" value={formData.role} onChange={handleChange}>
                {/* Dynamically render MenuItems based on roles from Redux store */}
                {roles &&
                  roles.map((role) => (
                    <MenuItem key={role.id} value={role.name}>
                      {role.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              style={{
                marginTop: "16px",
                height: "56px",
                backgroundColor: "#FF8100",
                boxShadow: "none",
              }}
              onClick={handleSubmit}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default UserForm;
