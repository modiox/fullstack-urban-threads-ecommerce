import React from "react"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { ThemeProvider } from "@mui/material/styles"
import muiTheme from "@/util/muiTheme"
import { AppDispatch } from "@/services/toolkit/store"
import { useDispatch } from "react-redux"
import { registerUser } from "@/services/toolkit/slices/userSlice"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
       
      </Link>
      {new Date().getFullYear()}
     
    </Typography>
  )
}

type FormData = {
  firstName: string
  lastName: string
  email: string
  password: string
  address: string
  allowExtraEmails: boolean
}

export default function SignUp() {
  const dispatch: AppDispatch = useDispatch()
  //after registration navigate to Login page 
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("Form submitted:", data)

    try {
      const response = await dispatch(registerUser(data))
      console.log("Response from register" + response.payload.message)
      toast.success("User createdd successfully")
      // navigate("/login")
    } catch (error: any) {
      console.error("Error:", error)
      if (error && error.message) {
        toast.error(error.message)
      } else {
        toast.error("Registration Failed")
      }
    }
  }



  return (
    <ThemeProvider theme={muiTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue=""
                  rules={{ required: "First name is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="First Name"
                      fullWidth
                      error={!!errors.firstName}
                      helperText={errors.firstName ? errors.firstName.message : ""}
                      autoComplete="given-name"
                      autoFocus
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Last name is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Last Name"
                      fullWidth
                      error={!!errors.lastName}
                      helperText={errors.lastName ? errors.lastName.message : ""}
                      autoComplete="family-name"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Enter a valid email address"
                    }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email Address"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message : ""}
                      autoComplete="email"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Password is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Password"
                      type="password"
                      fullWidth
                      error={!!errors.password}
                      helperText={errors.password ? errors.password.message : ""}
                      autoComplete="new-password"
                    />
                  )}
                />
              </Grid>
               <Grid item xs={12}>
                <Controller
                  name="address"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Address"
                      fullWidth
                    />
                  )}
                />
                
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="allowExtraEmails"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} color="primary" />}
                      label="I want to receive fashion inspiration and updates via email."
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}
