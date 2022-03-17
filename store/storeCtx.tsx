import { createContext, useReducer } from 'react';
import { ICafeterias } from '../pages/index';

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
};


const initialState = {
  latLong: '',
  cafeterias: [],
};

export const StoreCtx = createContext<{ 
  state: AppCtxInterface;
  dispatch: React.Dispatch<setLatLongAction | setCafteriasAction>;
}>({
  state: initialState,
  dispatch: () => null
});

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

const StoreProvider = ({ children }: StoreProvdrProps ) => {

  const [ state, dispatch ] = useReducer(storeReducer, initialState);

  return <StoreCtx.Provider value={{state, dispatch}}>
  { children }
  </StoreCtx.Provider>
};

export default StoreProvider;
