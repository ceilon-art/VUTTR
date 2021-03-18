import React from 'react';
import { AppProps } from 'next/app';
import GlobalStyle from '../styles/globals';
import { ToastProvider } from '../context/toast';
import { UserProvider } from '../context/user';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ToastProvider>
      <UserProvider>
        <Component {...pageProps} />
        <GlobalStyle />
      </UserProvider>
    </ToastProvider>
  )
}

export default MyApp
