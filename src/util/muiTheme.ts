// muiTheme.ts *Centralized Material UI File 
import { createTheme } from "@mui/material/styles"

// Define your Material-UI theme
const muiTheme = createTheme({
  palette: {
    //colors
    primary: {
      main: "#666699"
    },
    secondary: {
      main: "#996699"
    }
  }, //font
  typography: {
    fontFamily: "Raleway, Arial",
    fontSize: 15.5
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "10px", // Add margin bottom for TextField
          marginTop: "10px"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          marginLeft: "20px"
        }
      }
    }
  }
})

export default muiTheme
