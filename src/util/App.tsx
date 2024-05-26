import React, { useState } from 'react';
import Footer from "@/components/layout/Footer";
import Index from "@/routes";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Storage } from 'aws-amplify'
import "@aws-amplify/ui-react/styles.css"


const App: React.FC = () => {
  
  return (
    <div>
      <Index />
      <ToastContainer />
      <Footer />
    </div>
  )
}

export default App




