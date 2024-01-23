import { FC } from 'react';
import { Button } from 'react-bootstrap';

import SerchIcon from './../../assets/icon/search.svg?react';

import styles from './style.module.css';

interface ButtonFilterProps {
  onClickFilter: () => void;
}

const ButtonFilter: FC<ButtonFilterProps> = ({ onClickFilter }) => (
  <Button
    className={styles.button_filter}
    onClick={onClickFilter}
    size="sm"
    variant="light"
  >
    <SerchIcon />
  </Button>
);

export default ButtonFilter;
