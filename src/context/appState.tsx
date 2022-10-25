import { useReducer } from 'react';
import { TAppState } from '../types/application';
import { TFilter } from '../types/filter';

import AppContext from './appContext';
import AppReducer from './appReducer';
import {
  ADD_FILTER,
  FILTER_APPS,
  REMOVE_FILTER,

} from './static';

//data
import data from '../data/data.json';

type TProps = {
  children?: JSX.Element | JSX.Element[]
}


const AppState = (props: TProps) => {
  const initialState:TAppState = {
    filteredData: [],
    data: data,
    isFiltered: false,
    filters: []
  };

  const [appState, dispatch] = useReducer(AppReducer, initialState);

  // Filter Apps
  const filterApps = (filter: TFilter) => {
    dispatch({ type: FILTER_APPS, action: filter });
  };
  const addFilters = (filter: TFilter) => {
    dispatch({ type: ADD_FILTER, action: filter });
  };
  const removeFilters = (filter: TFilter) => {
    dispatch({ type: REMOVE_FILTER, action: filter });
  };

  return (
    <AppContext.Provider
      value={{
        ...appState,
        filterApps,
        addFilters,
        removeFilters
      }}>

      {props.children}
    </AppContext.Provider>
  )

}


export default AppState;