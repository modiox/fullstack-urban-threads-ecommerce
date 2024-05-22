import muiTheme from '@/util/muiTheme';
import { Box, Typography, Card, CardContent } from '@mui/material';
import React from 'react';
import { Link, ThemeProvider } from 'react-admin';
import { RootState } from '@/services/toolkit/store';
import { useSelector } from 'react-redux';

export const UserSidebar = () => {
    const { userData } = useSelector((state: RootState) => state.userR);

    return (
        <ThemeProvider theme={muiTheme}>
            <Box sx={{ padding: "20px", width: "300px" }}>
                <Card>
                    <CardContent>
                        <Typography variant="h4" component="h1" gutterBottom>
                            User Profile
                        </Typography>
                        <Typography variant="body1" component="p">
                            Username: {userData?.username}
                        </Typography>
                        <Typography variant="body1" component="p">
                            Email: {userData?.email}
                        </Typography>
                        <ul>
                            <li>
                                <Link to="/dashboard/user/profile"> Profile </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/user/orders"> Orders </Link>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </Box>
        </ThemeProvider>
    );
};
