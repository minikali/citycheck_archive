import React from 'react';
import type { AppProps } from 'next/app';
import LayoutContextProvider from '@/context/LayoutContext';
import AuthContextProvider from '@/context/AuthContext';
import '../styles/override.scss';
import '../styles/globals.scss';
import '../services/i18n';

const App = ({ Component, pageProps }: AppProps) => (
  <AuthContextProvider>
    <LayoutContextProvider>
      <Component {...pageProps} />
    </LayoutContextProvider>
  </AuthContextProvider>
);

export default App;
