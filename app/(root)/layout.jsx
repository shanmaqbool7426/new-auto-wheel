import React from 'react'
import Header from "@/components/Header.jsx"
import Footer from "@/components/Footer.jsx"
import { UserProvider } from '@/contexts/user';
import { AuthModalProvider } from '@/contexts/auth-modal';

const Rootlayout = ({ children }) => {
  return (
    <>
      <AuthModalProvider>
        <Header />
          <UserProvider>
          {children}
        </UserProvider>
        <Footer />
      </AuthModalProvider>

    </>
  )
}

export default Rootlayout