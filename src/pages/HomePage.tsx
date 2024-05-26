import TitlePage from "@/components/ui/TitlePage"
import React from "react"
import muiTheme from "@/util/muiTheme"
import CssBaseline from "@mui/material/CssBaseline"
import { Button, Container, ThemeProvider, Typography } from "@mui/material"
import "@/util/App.css"
import { Link } from "react-router-dom"
import Products from "@/components/ui/Products"

export const HomePage = () => {
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
              height: "70vh",
            }}
            
          >
            <div>
              <TitlePage title="Home" />
              <img src={"Logo.png"} alt="Logo" style={{ height: "300px", marginRight: "20px" }} />
              {/* <Link to={"/products"}>
                <Button color="primary" size="large"> SHOP NOW</Button>
              </Link> */}
              <div> <Products/> </div>
            </div>
          </div>
        </Typography>
      </Container>
    </ThemeProvider>
  )
}
export default HomePage
