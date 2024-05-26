import { Box, Typography, Card, CardContent, List, ListItem, Link as MuiLink } from '@mui/material';
import React from 'react';
import { Link } from 'react-admin';
import { RootState } from '@/services/toolkit/store';
import { useSelector } from 'react-redux';

export const UserSidebar = () => {
    const { userData } = useSelector((state: RootState) => state.userR);

    return (
        <Box sx={{ padding: "20px", width: "300px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        User Profile
                    </Typography>
                    <Typography variant="body1" component="p" sx={{ marginBottom: "10px" }}>
                        Username: {userData?.username}
                    </Typography>
                    <Typography variant="body1" component="p" sx={{ marginBottom: "20px" }}>
                        Email: {userData?.email}
                    </Typography>
                    <List>
                        <ListItem>
                            <MuiLink
                                component={Link}
                                to="/dashboard/user/orders"
                                underline="none"
                                sx={{ width: "100%" }}
                            >
                                Orders
                            </MuiLink>
                        </ListItem>
                        <ListItem>
                            <MuiLink
                                component={Link}
                                to="/dashboard/user/profile"
                                underline="none"
                                sx={{ width: "100%" }}
                            >
                                Profile
                            </MuiLink>
                        </ListItem>
                        <ListItem>
                            <MuiLink
                                component={Link}
                                to="/dashboard/user"
                                underline="none"
                                sx={{ width: "100%" }}
                            >
                                Go back to Dashboard
                            </MuiLink>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        </Box>
    );
};
