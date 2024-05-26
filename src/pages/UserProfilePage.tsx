import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch } from "react-redux";
import { updateUser } from "@/services/toolkit/slices/userSlice";
import useUserState from "@/hooks/useUserState";
import { AppDispatch } from "@/services/toolkit/store";
import muiTheme from "@/util/muiTheme";
import { UserSidebar } from "@/components/layout/sidebar/UserSidebar";

interface UpdateUserProfile {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  allowExtraEmails: boolean;
}

const UserProfile: React.FC = () => {
  const { userData } = useUserState();
  const dispatch: AppDispatch = useDispatch();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateUserProfile>();

  const onSubmit: SubmitHandler<UpdateUserProfile> = async (data) => {
    try {
      const res = await dispatch(updateUser({ updateUserData: data, userID: userData?.userID }));
      console.log(res);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  


  return (
    <div   className="product-container"
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "80vh",
      margin: 70 }}>
      <UserSidebar />
      <div>
        <Avatar sx={{ m: 10, bgcolor: "secondary" }}>
          <LockOutlinedIcon />
        </Avatar>
        {userData && (
          <>
            {userData.image && (
              <img src={userData.image} alt={userData.firstName} className="profile-img" />
            )}
            <h3>Name: {userData.firstName}</h3>
            <p>Email: {userData.email}</p>
            <p>Address: {userData.address}</p>
            <Button onClick={() => setIsFormOpen(!isFormOpen)}>
              {isFormOpen ? "Close Edit" : "Edit Info"}
            </Button>

            {isFormOpen && (
              <ThemeProvider theme={muiTheme}>
                <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <Box
                    sx={{
                      marginTop: 8,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography component="h1" variant="h5">
                      Edit Profile
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
                                message: "Enter a valid email address",
                              },
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
                            name="address"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <TextField {...field} label="Address" fullWidth />
                            )}
                          />
                        </Grid>
                      </Grid>
                      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Save Changes
                      </Button>
                    </Box>
                  </Box>
              
                </Container>
              </ThemeProvider>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
