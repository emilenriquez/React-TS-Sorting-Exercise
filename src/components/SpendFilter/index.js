import { useContext } from "react";
import RangeSlider from "../RangeSlider";
import AppContext from '../../context/appContext';

const SpendFilter = () => {
  const appContext = useContext(AppContext);

  const handleChange = (value) => {
    appContext.addFilters({key: 'spend', value})
    appContext.filterApps();
  }

  return <RangeSlider label="Spending" min={1} max={100000} onChange={handleChange} />
}

export default SpendFilter;

