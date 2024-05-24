import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Link from "@mui/material/Link"
import muiTheme from "@/util/muiTheme"
import { Button, Grid, TextField } from "@mui/material"

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
            py: 4,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[800],
            boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)"
          }}
        >
          <Container maxWidth="md">
            <Grid container spacing={2} alignItems="center" justifyContent="space-between">
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Join the community
                </Typography>
                <Typography variant="body1">
                  Subscribe to our newsletter for the latest updates and offers.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <TextField
                    variant="outlined"
                    type="email"
                    name="subs"
                    id="outlined-basic"
                    placeholder="Enter your email"
                    color="secondary"
                    size="small"
                    sx={{ flex: 1, marginRight: 1 }}
                  />
                  <Button variant="contained" color="primary" size="medium">
                    Subscribe
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Box mt={4} textAlign="center">
              <Copyright />
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}