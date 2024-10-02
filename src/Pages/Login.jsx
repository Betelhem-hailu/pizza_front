import { Button, Checkbox, FormControlLabel, TextField, Typography, Avatar, Grid2 } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { z } from 'zod';
import PizzaLogo from '../assets/pizza-logo.png'; 
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slices/user.slice';

const registrationSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
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

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.user.error);

  const handleSubmit = async (values) => {
    try {
        const user = {email:values.email, password: values.password };
  
        dispatch(login(user))
          .unwrap()
          .then(() => {
            navigate("/dashboard/orders");
          });
      
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
            email: '',
            password: ''
          }}
          validate={validateWithZod}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
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

    <FormControlLabel
      control={<Checkbox name="terms" color='primary'/>}
      label="Remember me"
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
                Login
              </Button>

              <Typography variant="body2" style={{ marginTop: '20px', textAlign: 'center' }}>
               Already have an account? <Link to="/register" style={{color:"#FFA500", textDecoration: "none" }}>Sign Up</Link>
              </Typography>
            </Form>
          )}
        </Formik>
        </Grid2>
    </Grid2>
  );
};

export default Login;
