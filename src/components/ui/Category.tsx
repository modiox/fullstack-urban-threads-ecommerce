import React from 'react'
import { ThemeProvider, Typography } from '@mui/material';
import muiTheme from '@/util/muiTheme';

const Category = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh"
        }}>
        <div>
          <h1> This is where my cateogries are gonna be listed </h1>
        </div>
      </div>
    </ThemeProvider>
  )
};
export default Category