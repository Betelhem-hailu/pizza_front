import { useState } from "react";
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

const UserForm = ({open, handleClose}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    phoneNumber1: "",
    phoneNumber2: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleSubmit = () => {
  //   // Logic to handle form submission
  //   console.log(formData);
  // };

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
          height= "30px"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email address"
          name="email"
          height= "30px"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Location"
          name="location"
          height= "30px"
          value={formData.location}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Phone Number"
          name="phoneNumber1"
          height= "30px"
          value={formData.phoneNumber1}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Phone Number"
          name="phoneNumber2"
          height= "30px"
          value={formData.phoneNumber2}
          onChange={handleChange}
        />
        <Grid container spacing={10} sx={{display: "flex", alignItems: "bottom"}}>
        <Grid item xs={6}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Select Role</InputLabel>
          <Select name="role" value={formData.role} onChange={handleChange}>
            <MenuItem value={"Admin"}>Admin</MenuItem>
            <MenuItem value={"User"}>User</MenuItem>
            <MenuItem value={"Manager"}>Manager</MenuItem>
          </Select>
        </FormControl>
        </Grid>
        <Grid item xs={6}>
        <Button
          variant="contained"
          fullWidth
          style={{ marginTop: "16px", height: "56px", backgroundColor: "#FF8100", boxShadow: "none" }}
          onClick={handleClose}
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
