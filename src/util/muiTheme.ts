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
    fontSize: 14.5
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "5px", // Add margin bottom for TextField
          marginTop: "5px"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          marginLeft: "5px"
        }
      }
    }
  }
})

export default muiTheme
