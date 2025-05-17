import React from 'react'
// import Header from "@/components/Header.jsx"
// import Footer from "@/components/Footer.jsx"
// import { UserProvider } from '@/contexts/user';
// import QueryProvider from '@/providers/query-provider';
import { AuthModalProvider } from '@/contexts/auth-modal';
import { metadata as siteMetadata } from './metadata';
import Script from 'next/script';

export const metadata = siteMetadata;

const Rootlayout = ({ children }) => {
  return (
    <>
      <AuthModalProvider>
        
            
            {children}

      </AuthModalProvider>
    </>
  )
}

export default Rootlayout