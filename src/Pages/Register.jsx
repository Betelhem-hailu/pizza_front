import { Button, Checkbox, FormControlLabel, TextField, Typography, Avatar, Grid2 } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { z } from 'zod';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PizzaLogo from '../assets/pizza-logo.png'; 
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../slices/user.slice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const registrationSchema = z.object({
  adminName: z.string().min(1, 'Admin Name is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
  confirmPassword: z.string().min(1, 'Confirm Password is required'),
  phoneNumber: z.string().min(1, 'Phone Number is required'),
  restaurantName: z.string().min(1, 'Restaurant Name is required'),
  location: z.string().min(1, 'Location is required'),
  logo: z.instanceof(File).refine(file => file.size > 0, 'Logo is required'),
  terms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
}).superRefine((values, ctx) => {
  if (values.password !== values.confirmPassword) {
    ctx.addIssue({
      path: ['confirmPassword'], // point to the confirmPassword field
      message: 'Passwords must match',
    });
  }
});


const validateWithZod = (values) => {
  try {
    // Try to validate the values using Zod schema
    registrationSchema.parse(values);
    return {}; // Return no errors if the validation passes
  } catch (err) {
    // Check if the error contains an 'issues' array (Zod's validation errors)
    if (err instanceof z.ZodError && err.errors) {
      return err.errors.reduce((acc, issue) => {
        acc[issue.path[0]] = issue.message;
        return acc;
      }, {});
    }
    
    // If the error is not from Zod or does not have errors array, return a general error
    console.error('Validation failed with an unexpected error:', err);
    return { general: 'Validation failed due to an unexpected error.' };
  }
};


const Register = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e, values) => {
    e.preventDefault();
      try {
        if (values.terms) {
        const formData = new FormData();
        formData.append('adminName', values.adminName);
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('phoneNumber', values.phoneNumber);
        formData.append('restaurantName', values.restaurantName);
        formData.append('location', values.location);
        formData.append('logo', values.logo); 

        dispatch(register(formData))
        .unwrap()
        .then((response) => {
          console.log(response);
          navigate("/login");
        })
        }
      }
    catch(error)  {
            if (error) {
                console.log(error)
                setError(error.message);
                console.error('Error during registration:', error);
            } else {
        setError("Submission failed. Please try again later.");
            }
        };
      }

  return (
    <Grid2 container>
      <Grid2 item size={6} 
      style={{
        backgroundColor: "#FFA500",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
        <Avatar variant="square" src={PizzaLogo} sx={{ width: 305, height: 300 }} />
      </Grid2>
      {error && <Typography variant='error'>{error}</Typography>}
      <Grid2 item size={6} 
      style={{
        padding: "80px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
        <Formik
          initialValues={{
            adminName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            restaurantName: '',
            location: '',
            logo: null,
            terms: false
          }}
          validate={validateWithZod}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, errors, touched }) => (
            <Form>
                <Grid2 container spacing={1} marginBottom={1}>
                <Avatar variant="square" src={PizzaLogo} sx={{ width: 30, height: 30 }} />
                <Typography variant="h5" gutterBottom color="#AF5901" sx={{fontWeight: "600" }}>
                Pizza 
                </Typography>
                </Grid2>

              <Field
                as={TextField}
                fullWidth
                label="Admin Name"
                name="adminName"
                sx={{
                  margin: "5px 0",
                  "& .MuiInputBase-root": {
                    
                    height: "46px",
                    padding: "12px 12px",
                    "& input": {
                      color: "#000",
                      padding: "5px",
                      fontSize: "16px",
                    },
                  },
                  "& label": {
                    color: "#000",
                    fontSize: "16px",
                    "&.Mui-focused": {
                      color: "#000",
                    },
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#000",
                      opacity: "23%"
                    },
                    "&:hover fieldset": {
                      borderColor: "#000",
                       opacity: "23%"
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#000",
                       opacity: "23%"
                    },
                  },
                }}
                error={touched.adminName && Boolean(errors.adminName)}
                helperText={touched.adminName && errors.adminName}
              />

              <Field
                as={TextField}
                fullWidth
                label="Email address"
                name="email"
                sx={{
                    margin: "5px 0",
                    "& .MuiInputBase-root": {
                      
                      height: "46px",
                      padding: "12px 12px",
                      "& input": {
                        color: "#000",
                        padding: "5px",
                        fontSize: "16px",
                      },
                    },
                    "& label": {
                      color: "#000",
                      fontSize: "16px",
                      "&.Mui-focused": {
                        color: "#000",
                      },
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#000",
                        opacity: "23%"
                      },
                      "&:hover fieldset": {
                        borderColor: "#000",
                         opacity: "23%"
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#000",
                         opacity: "23%"
                      },
                    },
                  }}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />

              <Field
                as={TextField}
                fullWidth
                label="Password"
                name="password"
                type="password"
                sx={{
                    margin: "5px 0",
                    "& .MuiInputBase-root": {
                      
                      height: "46px",
                      padding: "12px 12px",
                      "& input": {
                        color: "#000",
                        padding: "5px",
                        fontSize: "16px",
                      },
                    },
                    "& label": {
                      color: "#000",
                      fontSize: "16px",
                      "&.Mui-focused": {
                        color: "#000",
                      },
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#000",
                        opacity: "23%"
                      },
                      "&:hover fieldset": {
                        borderColor: "#000",
                         opacity: "23%"
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#000",
                         opacity: "23%"
                      },
                    },
                  }}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />

              <Field
                as={TextField}
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                sx={{
                    margin: "5px 0",
                    "& .MuiInputBase-root": {
                      
                      height: "46px",
                      padding: "12px 12px",
                      "& input": {
                        color: "#000",
                        padding: "5px",
                        fontSize: "16px",
                      },
                    },
                    "& label": {
                      color: "#000",
                      fontSize: "16px",
                      "&.Mui-focused": {
                        color: "#000",
                      },
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#000",
                        opacity: "23%"
                      },
                      "&:hover fieldset": {
                        borderColor: "#000",
                         opacity: "23%"
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#000",
                         opacity: "23%"
                      },
                    },
                  }}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />

              <Field
                as={TextField}
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                sx={{
                    margin: "5px 0",
                    "& .MuiInputBase-root": {
                      
                      height: "46px",
                      padding: "12px 12px",
                      "& input": {
                        color: "#000",
                        padding: "5px",
                        fontSize: "16px",
                      },
                    },
                    "& label": {
                      color: "#000",
                      fontSize: "16px",
                      "&.Mui-focused": {
                        color: "#000",
                      },
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#000",
                        opacity: "23%"
                      },
                      "&:hover fieldset": {
                        borderColor: "#000",
                         opacity: "23%"
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#000",
                         opacity: "23%"
                      },
                    },
                  }}
                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />

              <Field
                as={TextField}
                fullWidth
                label="Restaurant Name"
                name="restaurantName"
                sx={{
                    margin: "5px 0",
                    "& .MuiInputBase-root": {
                      height: "46px",
                      padding: "12px 12px",
                      "& input": {
                        color: "#000",
                        padding: "5px",
                        fontSize: "16px",
                      },
                    },
                    "& label": {
                      color: "#000",
                      fontSize: "16px",
                      "&.Mui-focused": {
                        color: "#000",
                      },
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#000",
                        opacity: "23%"
                      },
                      "&:hover fieldset": {
                        borderColor: "#000",
                         opacity: "23%"
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#000",
                         opacity: "23%"
                      },
                    },
                  }}
                error={touched.restaurantName && Boolean(errors.restaurantName)}
                helperText={touched.restaurantName && errors.restaurantName}
              />

              <Field
                as={TextField}
                fullWidth
                label="Location"
                name="location"
                sx={{
                    margin: "5px 0",
                    "& .MuiInputBase-root": {
                      
                      height: "46px",
                      padding: "12px 12px",
                      "& input": {
                        color: "#000",
                        padding: "5px",
                        fontSize: "16px",
                      },
                    },
                    "& label": {
                      color: "#000",
                      fontSize: "16px",
                      "&.Mui-focused": {
                        color: "#000",
                      },
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#000",
                        opacity: "23%"
                      },
                      "&:hover fieldset": {
                        borderColor: "#000",
                         opacity: "23%"
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#000",
                         opacity: "23%"
                      },
                    },
                  }}
                error={touched.location && Boolean(errors.location)}
                helperText={touched.location && errors.location}
              />

    <Button
      variant="outlined" 
      component="label"
      startIcon={<CloudUploadIcon />}
      style={{
        width: '100%', 
        height: "46px",
        border: '1px dashed rgba(0, 0, 0, 0.23)', 
        backgroundColor: 'transparent', 
        color: '#FFA500', 
        padding: '15px', 
        marginTop: '0', 
        marginBottom: '0', 
        textTransform: 'none', 
        cursor: 'pointer',
      }}
    >
      Upload Logo
      <input
        type="file"
        hidden
        onChange={(event) => setFieldValue('logo', event.currentTarget.files[0])}
      />
    </Button>
    {touched.logo && errors.logo && <Typography color="error">{errors.logo}</Typography>}

    <FormControlLabel
      control={<Checkbox name="terms" color='primary'/>}
      label="I accept the Terms and Conditions"
      style={{
        marginTop: '0', 
        marginBottom: '0',
      }}
    />
    {touched.terms && errors.terms && <Typography color="error">{errors.terms}</Typography>}


              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: '20px', backgroundColor: "#FFA500" }}
              >
                SIGN UP
              </Button>

              <Typography variant="body2" style={{ marginTop: '20px', textAlign: 'center' }}>
                Already have an account? <Link to="/login" style={{color:"#FFA500", textDecoration: "none" }}>Login</Link>
              </Typography>
            </Form>
          )}
        </Formik>
        </Grid2>
    </Grid2>
  );
};

export default Register;
