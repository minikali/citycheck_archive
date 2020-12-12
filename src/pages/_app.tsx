import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.scss';
import '../services/i18n';

const App = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default App;
