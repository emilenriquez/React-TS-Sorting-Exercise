import { useContext } from 'react';
import ApplicationItem from './item';
import {Application as ApplicationType} from '../../types/application'
import AppContext from '../../context/appContext';


//const ApplicationList = (props: Props) => {
const ApplicationList: React.FC = (): JSX.Element => {

  const appContext = useContext(AppContext);
  const isFiltered = appContext?.isFiltered;
  const data = isFiltered ? appContext.filteredData : appContext?.data;

  return (
    <div className='flex-container flex-wrap'>
      {data?.map((app: ApplicationType) => (<ApplicationItem key={app.id} {...app} />))}
    </div>
  )
}

export default ApplicationList;