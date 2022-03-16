import { createContext, useReducer } from 'react';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ICafeterias } from '.';

interface AppCtxInterface {
  latLong: string;
  cafeterias: ICafeterias[];
};

interface StoreProvdrProps {
  children: React.ReactElement;
};

export enum ActionTypes {
  SET_LAT_LONG,
  SET_CAFETERIAS
};;

export interface setLatLongAction {
  type: ActionTypes.SET_LAT_LONG;
  payload: {latLong: string}
};

export interface setCafteriasAction {
  type: ActionTypes.SET_CAFETERIAS;
  payload: {cafeterias: ICafeterias[]}
}

const storeReducer = (state: {latLong: string, cafeterias: ICafeterias[]}, action: setLatLongAction | setCafteriasAction) => {
  switch(action.type) {
    case ActionTypes.SET_LAT_LONG: {
      return {...state, latLong: action.payload.latLong}
    }
    case ActionTypes.SET_CAFETERIAS: {
      return {...state, cafeterias: action.payload.cafeterias}
    }
    default:
      throw new Error(`Unhandled Action type ${action}`);
  }
}

const StoreCtx = createContext<AppCtxInterface | {}>({});

const StoreProvider = ({ children }: StoreProvdrProps ): React.ReactElement => {
  const initialState = {
    latLong: '',
    cafeterias: [],
  };

  const [ state, dispatch ] = useReducer(storeReducer, initialState);

  return <StoreCtx.Provider value={{state, dispatch}}>
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
