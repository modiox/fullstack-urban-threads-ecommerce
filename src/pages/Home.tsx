import TitlePage from "@/components/ui/TitlePage"
import React from "react"
import muiTheme from "@/util/muiTheme"
import CssBaseline from "@mui/material/CssBaseline"
import { Button, Container, ThemeProvider, Typography } from "@mui/material"
import "@/util/App.css"
import { Link } from "react-router-dom"

export const Home = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <Container>
        <CssBaseline />
        <Typography>
       
          <div
            style={{
              display: "grid",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh"
            }}
          >
            <div className="home-container">
              <TitlePage title="Home" />
              <h2 className="home-title">Welcome to the eCommerce website </h2>
              <Link to={"/products"}>
                {" "}
                <Button> List of All Products </Button>{" "}
              </Link>
            </div>
          </div>
        </Typography>
      </Container>
    </ThemeProvider>
  )
}
export default Home
