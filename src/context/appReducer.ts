import {
  FILTER_APPS,
  ADD_FILTER,
} from './static';
import { Application as AppType } from '../types/application';
import { TAppState } from '../types/application';
import { TDispatch } from '../types/dispatch';
import { TActiveBCAPFilters } from '../types/filter';


/**
 * Narrow down searches
 * e.g.narrow down up to b1.1.1 and show all b2
 * {
 *    BCAP1: [b1, b2]
 *    BCAP2: [b1.1]
 *    BCAP3: [b1.1.1]
 * }
 * @returns
 */
const narrowDownNavFilter = (filter: TActiveBCAPFilters) => {
  return Object
  .keys(filter)
  .reduce((obj: TActiveBCAPFilters, bcapKey: string) => {
     switch(bcapKey){
       case 'BCAP1':
         const normalizedBcap1 = filter['BCAP1'].filter(
           filterVal => !filter['BCAP2'].some(
             bcap2FilterVal => bcap2FilterVal.includes(filterVal)
           )
         )
         return {
           ...obj,
           BCAP1: normalizedBcap1
         }
       case 'BCAP2':
         const normalizedBcap2 = filter['BCAP2'].filter(
           filterVal => !filter['BCAP3'].some(
             bcap3FilterVal => bcap3FilterVal.includes(filterVal)
           )
         )
         return {
           ...obj,
           BCAP2: normalizedBcap2
         }
      default:
         return {
           ...obj,
           BCAP3: filter['BCAP3']
         }
     }
  }, {BCAP1: [], BCAP2: [], BCAP3: []})
}

const appReducer = (
  state: TAppState,
  dispatch:TDispatch) => {

    switch(dispatch.type) {
        case FILTER_APPS:
            return {
                ...state,
                filteredData: state.data.filter((app:AppType) => {
                    if(!state.filters.length){ // no filters setup return
                      return true;
                    }

                    // Do Combined Filters

                    return state.filters.reduce((filterResult, {key, value}) => {
                      if(key === 'spend'){ //spendFilter
                        return filterResult && app[key] <= value;
                      }


                      // else this is BCAP search
                      if(typeof value !== 'number'){
                        const bcapFilter = narrowDownNavFilter(value);
                        // check if BCAP filters are not empty otherwise just return true;
                        const hasBcapFilter = Object.entries(bcapFilter)
                          .some(([_, val]) => val.length )

                        if(!hasBcapFilter) {
                          return filterResult && true;
                        }
                        return filterResult && Object.entries(bcapFilter)
                          .some(([bcapKey, bcapValues]) => {
                            if(!bcapValues.length) return false;
                            return bcapValues.includes(app[bcapKey as keyof TActiveBCAPFilters]);
                          })
                      }

                      return filterResult;
                    }, true);
                }),
                isFiltered: true
            }
        case ADD_FILTER:
            return {
              ...state,
              filters: [
                ...state.filters.filter(filter => filter.key !== dispatch.action?.key),
                dispatch.action
              ]
            }

        default:
            return state;
    }
}

export default appReducer;