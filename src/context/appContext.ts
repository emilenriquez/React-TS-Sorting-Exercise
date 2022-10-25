import { createContext } from 'react';
import { TAppState } from '../types/application';

type TAppContext = {
  filterApps: Function,
  removeFilters: Function,
  addFilters: Function
} & TAppState

const AppContext = createContext<TAppContext | null>(null);

export default AppContext;