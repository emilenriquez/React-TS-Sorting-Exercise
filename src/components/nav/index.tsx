// import Collapsible from "../collapsible";
import { useContext, useState } from 'react';
import Collapsible from './collapsible';
import AppContext from '../../context/appContext';
import { TActiveBCAPFilters } from '../../types/filter';

type TNavigation = {
  label: string,
  subNav: TNavigation[]
}



/**
 * build nav tree from 1.1.1 to 3.3.3 - can be modified by adjusting the digit limit
 * @returns array of navigation
 */
const getNavList = (): TNavigation[] => {
  const label = "Business Capability";
  const firstDigitLimit = 3;
  const secondDigitLimit = 3;
  const thirdDigitLimit = 3;

  const createBcapArrayFromLength = (length: number): Number[] => {
    return Array.from(Array(length).keys()).map(i => i+1);
  }

  return createBcapArrayFromLength(firstDigitLimit)
    .map(bcap1 => {
      //bcap1
      return {
        label: `${label} ${bcap1}`,
        subNav: createBcapArrayFromLength(secondDigitLimit)
          .map(bcap2 => ({
            label: `${label} ${bcap1}.${bcap2}`,
            subNav: createBcapArrayFromLength(thirdDigitLimit)
              .map(bcap3 => ({
                label: `${label} ${bcap1}.${bcap2}.${bcap3}`,
                subNav: []
              }))
          }))
      }
    })
}

/**
 * categorizes filter by bcap degree (BCAP1, BCAP2, BCAP3)
 */
const categorizeNavFilter = (filter:string): string => {

  const categoryNum = filter?.match(/\./g)?.length || 0;
  switch (categoryNum) {
    case 0:
      return 'BCAP1'
    case 1:
      return 'BCAP2'
    case 2:
      return 'BCAP3'
    default:
      return ''
  }

}

const Navigation = () => {
  const appContext = useContext(AppContext);
  const [activeFilters, setActiveFilters]:[activeFilters: TActiveBCAPFilters, setActiveFilters: Function] = useState({
    BCAP1: [],
    BCAP2: [],
    BCAP3: []
  })

  const handleNav = ({isActive, value}:{isActive:boolean, value: string}) => {
    const filterKey = categorizeNavFilter(value);
    const updatedActiveFilters = isActive ?
      {
        ...activeFilters,
        [filterKey]: [...activeFilters[filterKey as keyof TActiveBCAPFilters], value]
      } :
      {
        ...activeFilters,
        [filterKey]: [...activeFilters[filterKey as keyof TActiveBCAPFilters].filter(bcapVal => bcapVal !== value)]}

    setActiveFilters(updatedActiveFilters)

    appContext?.addFilters({key: 'BCAP', value: updatedActiveFilters});
    appContext?.filterApps();
  }
  /**
   * NOTE: would be nice to use the router or url as a way to query for the BCAP but in this exam
   * the use of other lib is not allowed
   */
  const navList: TNavigation[] = getNavList();
  const renderNavList = (): JSX.Element => {
    return (<ul className='pl-0 navList '>
      {navList.map(navItem => <Collapsible onNavigate={handleNav} key={navItem.label} title={navItem.label} isOpen={false}>
        {navItem.subNav.map(navItem2 =>
        <Collapsible key={navItem2.label} title={navItem2.label} isOpen={false} onNavigate={handleNav} >
          {navItem2.subNav.map(navItem3 => <Collapsible onNavigate={handleNav}  key={navItem3.label} title={navItem3.label} />)}
        </Collapsible>)}
      </Collapsible>)}
    </ul>)
  }

  return (
    <>
      <strong> NAVIGATION</strong>
      {renderNavList()}
    </>
  )
}

export default Navigation;

