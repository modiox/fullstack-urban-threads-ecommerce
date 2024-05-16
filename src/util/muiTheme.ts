// muiTheme.ts *Centralized Material UI File 
import { createTheme } from "@mui/material/styles"

// Define your Material-UI theme
const muiTheme = createTheme({
  palette: { //colors
    primary: {
      main: "#3f51b5"
    },
    secondary: {
      main: "#f50057"
    }
  }, //font
  typography: {
    fontFamily: "Arial, sans-serif",
    fontSize: 14.5
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
    },
    
  }
})

export default muiTheme
