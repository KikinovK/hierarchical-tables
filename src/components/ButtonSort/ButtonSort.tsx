import { FC } from 'react';
import { Button } from 'react-bootstrap';

import { sortDirection } from '../../shared/constants/sortDirection';
import { ChangeSortFunction, field, typeSort } from '../../type/type';

import ArrowDownIcon from './../../assets/icon/arrow-down.svg?react';
import ArrowDownUpIcon from './../../assets/icon/arrow-down-up.svg?react';
import ArrowUpIcon from './../../assets/icon/arrow-up.svg?react';

import styles from './style.module.css';

interface ButtonSortProps {
  fieldSort: field;
  metodSort: typeSort;
  changeSort: ChangeSortFunction;
}

const ButtonSort: FC<ButtonSortProps> = ({
  fieldSort,
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

    changeSort({ fieldSort, metodSort: newSort });
  };

  return (
    <Button
      className={styles.button_sort}
      onClick={handlerClick}
      size="sm"
      variant="light"
    >
      {getIcon()}
    </Button>
  );
};

export default ButtonSort;
