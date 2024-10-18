import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { z } from "zod";
import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { AdminLayout } from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { createMenu, fetchToppings } from "../slices/menu.slice";

const validationSchema = z.object({
  name: z.string().min(1, "Menu Name is required"),
  price: z
    .number()
    .positive("Price must be a positive number")
    .max(9999, "Price must be less than 10,000"),
  toppings: z.array(z.string()).min(1, "At least one topping is required"),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Photo is required"),
});

const AddMenu = () => {
  const dispatch = useDispatch();
  const { toppings } = useSelector((state) => state.menu);
  const [showNewToppingInput, setShowNewToppingInput] = useState(false);
  const [newToppingName, setNewToppingName] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(fetchToppings());
  }, [dispatch]);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("toppings", JSON.stringify(values.toppings));

    formData.append("image", values.image);


    dispatch(createMenu(formData))
      .unwrap()
      .then(() => {
        setOpen(true); 
      })
      .catch((error) => {
        console.log("Menu creation failed:", error);
      });
  };

  return (
    <AdminLayout>
      <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
        <Typography
          sx={{ fontSize: "22px", color: "#525256", textAlign: "center" }}
        >
          Add Menu
        </Typography>
        <Formik
          initialValues={{
            name: "",
            price: "",
            toppings: [],
            image: null,
          }}
          validate={(values) => {
            const errors = {};
            const validationErrors = validationSchema.safeParse(values);
            if (!validationErrors.success) {
              validationErrors.error.errors.forEach((error) => {
                errors[error.path[0]] = error.message;
              });
            }
            return errors;
          }}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, errors, values }) => (
            <Form>
              <Field
                as={TextField}
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                name="name"
                error={!!errors.name}
                helperText={errors.name}
              />

              <Typography
                sx={{ fontSize: "22px", color: "#00000080", marginTop: "5px" }}
              >
                Topping
              </Typography>
              <Grid
                container
                spacing={2}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginTop: "2px",
                }}
              >
                {toppings &&
                  toppings.map((topping) => (
                    <Grid item xs="auto" key={topping.id}>
                      <FormControlLabel
                        control={
                          <Field
                            as={Checkbox}
                            name="toppings"
                            checked={values.toppings.includes(topping.name)}
                            onChange={({ target }) => {
                              const selectedToppings = new Set(values.toppings);
                              if (target.checked) {
                                selectedToppings.add(topping.name);
                              } else {
                                selectedToppings.delete(topping.name);
                              }
                              setFieldValue("toppings", Array.from(selectedToppings));
                            }}
                            sx={{
                              "&.Mui-checked": {
                                color: "#FF8100",
                              },
                            }}
                          />
                        }
                        label={
                          topping.name.charAt(0).toUpperCase() +
                          topping.name.slice(1)
                        }
                      />
                    </Grid>
                  ))}
                {showNewToppingInput && (
                  <Grid item xs={6} sx={{ display: "flex" }}>
                    <FormControlLabel
                      control={
                        <Field
                         as={Checkbox}
                          checked={values.toppings.includes(newToppingName)}
                          onChange={() => {
                            if (newToppingName.trim()) {
                              setFieldValue("toppings", [
                                ...values.toppings,
                                newToppingName,
                              ]);
                            }
                          }}
                          sx={{
                            "&.Mui-checked": {
                              color: "#FF8100",
                            },
                          }}
                        />
                      }
                    />
                    <Field
                      as={TextField}
                      label="Topping name"
                      value={newToppingName}
                      onChange={(e) => setNewToppingName(e.target.value)}
                      sx={{
                        mr: 2,
                        "& label": {
                          color: "#000",
                          fontSize: "16px",
                          "&.Mui-focused": {
                            color: "#FF8100",
                          },
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#FF8100",
                            opacity: "23%",
                          },
                          "&:hover fieldset": {
                            borderColor: "#FF8100",
                            opacity: "23%",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#FF8100",
                            opacity: "23%",
                          },
                        },
                      }}
                      fullWidth
                    />
                  </Grid>
                )}
                <Button
                  variant="contained"
                  onClick={() => setShowNewToppingInput(true)}
                  sx={{
                    backgroundColor: "#FF8100",
                    textTransform: "none",
                    height: "46px",
                    width: "73px",
                    alignSelf: "center",
                  }}
                >
                  + Add
                </Button>
              </Grid>

              <Field
                as={TextField}
                label="Price"
                variant="outlined"
                fullWidth
                style={{ marginTop: "20px" }}
                name="price"
                type="number"
                error={!!errors.price}
                helperText={errors.price}
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                  style={{
                    width: "321px",
                    height: "74px",
                    border: "1px dashed rgba(0, 0, 0, 0.23)",
                    borderRadius: "10px",
                    backgroundColor: "transparent",
                    color: "#FF8100",
                    padding: "15px",
                    marginTop: "25px",
                    textTransform: "none",
                    cursor: "pointer",
                  }}
                >
                  Upload Logo
                  <input
                    type="file"
                    hidden
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      setFieldValue("image", file);
                    }}
                  />
                </Button>
                {errors.image && (
                  <Typography color="error">{errors.image}</Typography>
                )}

                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{
                    mt: "30px",
                    width: "321px",
                    height: "74px",
                    borderRadius: "20px",
                    alignContent: "center",
                    backgroundColor: "#FF8100",
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
        <Dialog open={open} onClose={handleClose} PaperProps={{
    sx: {
      borderRadius: "20px", 
      width: "800px",
      height: "500px",
    },
  }}>
      <DialogContent>
         <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <IconButton
            sx={{
              width: '280px',
              height: '280px',
              backgroundColor: '#E8F5E9',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
            disableRipple
          >
            <CheckCircleIcon sx={{ color: '#01C550', fontSize: '150px' }} />
          </IconButton>
          <Typography variant="h6" sx={{ color: '#01C550', fontWeight: 'bold', fontSize: "32px" }}>
          Your have uploaded the Pizza successfully.
          </Typography>
        </Box>
      </DialogContent>
      </Dialog>
      </Box>
    </AdminLayout>
  );
};

export default AddMenu;

