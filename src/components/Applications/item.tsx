import {Application as ApplicationType} from '../../types/application'

//note: I would have loved to use "styled components" library to style individual components
import styles from './AppItem.module.css';

const ApplicationItem = ({name, spend}: ApplicationType) => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}> {name} </h4>
      {`Total Spend: $${spend.toLocaleString()}`}
    </div>
  )
}

export default ApplicationItem;