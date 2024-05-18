// import React from "react"
// import { AppBar, Toolbar, Typography, createTheme, ThemeProvider } from "@mui/material"
// import Button from "@mui/material/Button"
// import TextField from "@mui/material/TextField"
// import muiTheme from "@/util/muiTheme"


// const Footer = () => {
//   return (
//     <ThemeProvider theme={muiTheme}>
//       <AppBar
//         position="static"
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           minHeight: "50vh"
//         }}
//       >
//         <Toolbar>
//           <Typography variant="body1" padding={5}>
//             © {new Date().getFullYear()} My Website{" "}
//           </Typography>
//           <Typography variant="body1" sx={{ marginLeft: "10px", marginRight: "10px" }}>
//             Subscribe to our newsletter
//           </Typography>

//           <Typography variant="body1">Copyright. © All rights resevered.</Typography>
//         </Toolbar>
//       </AppBar>
//     </ThemeProvider>
//   )
// }

// export default Footer


import * as React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Link from "@mui/material/Link"
import muiTheme from "@/util/muiTheme"
import { Button, TextField } from "@mui/material"

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit">
        URBAN THREADS  <br></br>
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

export default function StickyFooter() {
  return (
    <ThemeProvider theme={muiTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh"
        }}
      >
        <CssBaseline />

        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[800]
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1">
              <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
                <Typography variant="body1">
                  {" "}
                  Join the community {" "}
                </Typography>
              </Container>
              <TextField
                variant="outlined"
                type="email"
                name="subs"
                id="outlined-basic"
                placeholder="email.."
                color="secondary"
                sx={{ marginLeft: "20px" }}
                size="small"
              />
              <Button variant="contained" color="secondary" sx={{ margin: "10px" }} size="medium">
                {" "}
                Subscribe
              </Button>
            </Typography>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}