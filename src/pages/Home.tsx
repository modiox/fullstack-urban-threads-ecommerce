import ProductSidebar from "@/components/layout/sidebar/ProductSidebar"
import TitlePage from "@/components/ui/TitlePage"
import React from "react"
import muiTheme from "@/util/muiTheme"
import { ThemeProvider } from "@mui/material"

export const Home = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <div className="home-container">
        <TitlePage title="Home" />
        <h2 className="home-title">Welcome to the eCommerce website </h2>
        <div className="sidebar">
          <ProductSidebar/>
        </div>
      </div>
    </ThemeProvider>
  )
}
export default Home
