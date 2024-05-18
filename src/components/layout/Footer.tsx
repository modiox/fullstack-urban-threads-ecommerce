import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
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