// muiTheme.ts *Centralized Material UI File 
import { createTheme } from "@mui/material/styles"

// Define your Material-UI theme
const muiTheme = createTheme({
  palette: {
    //colors
    primary: {
      main: "#2D3250",
      light: "#FFFFFF"
    },
    secondary: {
      main: "#7077A1",
      light: "#F6B17A",


    }
  }, //font
  typography: {
    fontFamily: "Raleway, Arial",
    fontSize: 12.5
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
