import { Button, Checkbox, FormControlLabel, TextField, Typography, Avatar, Grid2 } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { z } from 'zod';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PizzaLogo from '../assets/pizza-logo.png'; 
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../slices/user.slice';
import { useDispatch, useSelector } from 'react-redux';

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
      path: ['confirmPassword'],
      message: 'Passwords must match',
    });
  }
});


const validateWithZod = (values) => {
  try {
    registrationSchema.parse(values);
    return {}; 
  } catch (err) {
    if (err instanceof z.ZodError && err.errors) {
      return err.errors.reduce((acc, issue) => {
        acc[issue.path[0]] = issue.message;
        return acc;
      }, {});
    }
    
    console.error('Validation failed with an unexpected error:', err);
    return { general: 'Validation failed due to an unexpected error.' };
  }
};


const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.user.error);

  const handleSubmit = async (values) => {
    try {
      if (values.terms) {
        const formData = new FormData();
        formData.append('adminName', values.adminName);
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('phoneNumber', values.phoneNumber);
        formData.append('restaurantName', values.restaurantName);
        formData.append('location', values.location);
        formData.append('image', values.logo); 
  
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }
  
        dispatch(register(formData))
          .unwrap()
          .then(() => {
            navigate("/login");
          });
      }
    } catch (error) {
        console.log(error);
    }
  };
  

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
                {error && <Typography color="error">{error}</Typography>}
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
    onChange={(event) => {
      const file = event.currentTarget.files[0];
      console.log(file); // Check if the file is correctly selected
      setFieldValue('logo', file);  // Set the file to Formik state
    }}
  />
</Button>
{touched.logo && errors.logo && <Typography color="error">{errors.logo}</Typography>}


    <Field
  name="terms"
>
  {({ field, form }) => (
    <FormControlLabel
      control={
        <Checkbox
          {...field}
          checked={field.value}
          onChange={(event) => form.setFieldValue('terms', event.target.checked)}
          color="primary"
        />
      }
      label="I accept the Terms and Conditions"
      style={{
        marginTop: '0', 
        marginBottom: '0',
      }}
    />
  )}
</Field>
              
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
