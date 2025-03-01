import React from 'react'
import Header from "@/components/Header.jsx"
import Footer from "@/components/Footer.jsx"
import { UserProvider } from '@/contexts/user';
import QueryProvider from '@/providers/query-provider';
import { AuthModalProvider } from '@/contexts/auth-modal';

const Rootlayout = ({ children }) => {
  return (
    <>
      <AuthModalProvider>
        <Header />
        <QueryProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </QueryProvider>
        <Footer />
      </AuthModalProvider>

    </>
  )
}

export default Rootlayout