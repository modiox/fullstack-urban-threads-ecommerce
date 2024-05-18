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
            className="home-container"
            style={{
              display: "grid",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh"
            }}
          >
            <div>
              <TitlePage title="Home" />
              <h2> URBAN THREADS</h2>
              <Link to={"/products"}>
                <Button> SHOP NOW</Button>
              </Link>
              <div> </div>
            </div>
          </div>
        </Typography>
      </Container>
    </ThemeProvider>
  )
}
export default Home
