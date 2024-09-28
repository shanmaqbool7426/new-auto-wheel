import React from 'react'
import Header from "@/components/Header.jsx"
import Footer from "@/components/Footer.jsx"
const Rootlayout = ({ children }) => {
  return (
    <>

      <Header />
      {children}
      <Footer />

    </>
  )
}

export default Rootlayout