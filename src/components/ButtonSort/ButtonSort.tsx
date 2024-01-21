import { FC } from 'react';
import { Button } from 'react-bootstrap';

import { sortDirection } from '../../shared/constants/sortDirection';
import { filed, typeSort } from '../../type/type';

import ArrowDownIcon from './../../assets/icon/arrow-down-up.svg';
import ArrowDownUpIcon from './../../assets/icon/arrow-down-up.svg?react';
import ArrowUpIcon from './../../assets/icon/arrow-up.svg?react';

import styles from './style.module.css';

interface ButtonSortProps {
  filedSort: filed;
  metodSort: typeSort;
  changeSort: ({
    filedSort,
    metodSort,
  }: {
    filedSort: filed;
    metodSort: typeSort;
  }) => void;
}

const ButtonSort: FC<ButtonSortProps> = ({
  filedSort,
  metodSort,
  changeSort,
}) => {
  const getIcon = () => {
    switch (metodSort) {
      case sortDirection.NONE:
        return <ArrowDownUpIcon />;
      case sortDirection.ASCENDING:
        return <ArrowUpIcon />;
      case sortDirection.DESCENDING:
        return <ArrowDownIcon />;
      default:
        throw new Error(`Invalid sort name: ${metodSort}`);
    }
  };

  const handlerClick = () => {
    let newSort: typeSort;

    switch (metodSort) {
      case sortDirection.NONE:
        newSort = sortDirection.ASCENDING;
        break;
      case sortDirection.ASCENDING:
        newSort = sortDirection.DESCENDING;
        break;
      case sortDirection.DESCENDING:
        newSort = sortDirection.NONE;
        break;
      default:
        throw new Error(`Invalid sort name: ${metodSort}`);
    }
    changeSort({ filedSort, metodSort: newSort });
  };

  return (
    <Button className={styles.button_sort} onClick={handlerClick}>
      {getIcon()}
    </Button>
  );
};

export default ButtonSort;
