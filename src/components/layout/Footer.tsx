import React from "react"
import { AppBar, Toolbar, Typography, createTheme, ThemeProvider } from "@mui/material"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import muiTheme from "@/util/muiTheme"


const Footer = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="body1" padding={5}>
            © {new Date().getFullYear()} My Website{" "}
          </Typography>
          <Typography variant="body1" sx={{ marginLeft: "10px", marginRight: "10px" }}>
            Subscribe to our newsletter
          </Typography>
          <TextField
            variant="outlined"
            type="email"
            name="subs"
            id="outlined-basic"
            placeholder="Enter your email.."
            color="secondary"
            sx={{ marginLeft: "20px" }}
            size="small"
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginLeft: "10px", marginRight: "10px" }}
            size="small"
          >
            Subscribe
          </Button>
          <Typography variant="body1">Copyright. © All rights resevered.</Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}

export default Footer
