import { useState } from 'react';
import styles from './RangeSlider.module.css';

type TSlider = {
  label?: string
  max?: number
  min?: number
  onChange?: Function
}

const RangeSlider = ({label, min, max, onChange}: TSlider):JSX.Element => {
  const [rangeValue, setRangeValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRangeValue(parseInt(event.target.value))
    onChange && onChange(event.target.value);
  }

  return <div className={styles.slidecontainer}>
    {/* TODO: allow props for min and max */}
    <span>{label}: {rangeValue.toLocaleString()}</span>
    <input
      type="range"
      min={min || 0}
      max={max || 100000}
      step={1}
      className={styles.slider}
      name={`input${label}`}
      onChange={handleChange} //TODO: would be nice to implement a throttle
        />
    <div className="flex-container flex-space-between">
      <div className={styles.min}>{min?.toLocaleString()}</div>
      <div className={styles.max}>{max?.toLocaleString()}</div>

    </div>
  </div>
  ;
}

export default RangeSlider;

