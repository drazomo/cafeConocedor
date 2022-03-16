import { createContext } from 'react';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ICafeterias } from '.';

interface AppCtxInterface {
  latLong: string;
  cafeterias: ICafeterias[];
};

interface StoreProvdrProps {
  children: React.ReactElement;
}

const StoreCtx = createContext<AppCtxInterface | null>(null);

const StoreProvider = ({ children }: StoreProvdrProps ): React.ReactElement => {
  const initialState = {
    latLong: '',
    cafeterias: [],
  };

  return <StoreCtx.Provider value={initialState}>
    {children}
  </StoreCtx.Provider>
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <StoreProvider>
  <Component {...pageProps} />
  </StoreProvider>
  )
}

export default MyApp
