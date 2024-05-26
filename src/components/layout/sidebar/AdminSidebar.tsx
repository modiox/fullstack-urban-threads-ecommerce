import muiTheme from "@/util/muiTheme";
import { Box, ThemeProvider, List, ListItem, Typography, Link as MuiLink, Card, CardContent } from "@mui/material";
import { ListItemIcon, ListItemText, Divider } from "@mui/material";
import { Category, ShoppingCart, Person, Dashboard } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/services/toolkit/store";

export const AdminSidebar = () => {
  const { userData } = useSelector((state: RootState) => state.userR);

  return (
    
   
      <Box sx={{ padding: "20px", width: "300px",  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", }}>
        <Box> </Box>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Admin Profile
            </Typography>
            <Typography variant="body1" component="p">
              Username: {userData?.username}
            </Typography>
            <Typography variant="body1" component="p">
              Email: {userData?.email}
            </Typography>
            <List sx={{ marginTop: "20px" }}>
              <ListItem >
                <MuiLink
                  component={Link}
                  to="/dashboard/admin/categories"
                  underline="none"
                  sx={{ width: "100%" }}
             
                >
                  Categories
                </MuiLink>
              </ListItem>
              <ListItem>
                <MuiLink
                  component={Link}
                  to="/dashboard/admin/products"
                  underline="none"
                  sx={{ width: "100%" }}
                >
                  Products
                </MuiLink>
              </ListItem>
              <ListItem>
                <MuiLink
                  component={Link}
                  to="/dashboard/admin/orders"
                  underline="none"
                  sx={{ width: "100%" }}
                >
                  Users' Orders
                </MuiLink>
              </ListItem>
              <ListItem>
                <MuiLink
                  component={Link}
                  to="/dashboard/admin/users"
                  underline="none"
                  sx={{ width: "100%" }}
                >
                  Users
                </MuiLink>
              </ListItem>
              <ListItem>
                <MuiLink
                  component={Link}
                  to="/dashboard/admin"
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
