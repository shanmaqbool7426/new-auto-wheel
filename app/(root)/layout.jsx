import React from 'react'
import Header from "@/components/Header.jsx"
import Footer from "@/components/Footer.jsx"
import { UserProvider } from '@/contexts/user';
const Rootlayout = ({ children }) => {
  return (
    <>
      <Header />
      <UserProvider>
        {children}
      </UserProvider>
      <Footer />

    </>
  )
}

export default Rootlayout