import React, { useState } from "react";
import { HiChevronRight, HiChevronDown } from "react-icons/hi";
import styles from './Collapsible.module.css';

type Props = {
  isOpen?: boolean,
  children?: JSX.Element | JSX.Element[]
  title: string,
  shouldCollapse?: boolean,
  onNavigate?: Function,
}


const Collapsible: React.FC<Props> = ({
  isOpen: isOpenFromProps,
  children,
  title,
  onNavigate
  }: Props) =>{

  const [isOpen, setIsOpen] = useState(isOpenFromProps || false);
  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const updatedIsOpen = !isOpen;
    setIsOpen(updatedIsOpen);

    onNavigate && onNavigate({isActive: updatedIsOpen, value: event.currentTarget.name});
  }

  return(
      <li className={styles.wrapper}>
        <button
          onClick={handleToggle}
          className={`${styles.toggleButton} ${isOpen ? styles.activeNav : ''}`}
          name={title}
          >
            {isOpen ? <HiChevronDown /> : <HiChevronRight />} {title}
        </button>
        {children && isOpen ? <ul className="navList">{children}</ul> : <></>}
      </li>
  )
}
export default Collapsible;