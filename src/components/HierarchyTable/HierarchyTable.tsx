import { FC } from 'react';
import { Table } from 'react-bootstrap';

import { sortDirection } from '../../shared/constants/sortDirection';
import {
  ChangeFilterFunction,
  ChangeSortFunction,
  field,
  rawData,
  typeSort,
} from '../../type/type';
import ButtonSort from '../ButtonSort/ButtonSort';
import Filter from '../Filter/Filter';

import styles from './style.module.css';

interface HierarchyTableProps {
  data: rawData[];
  handleRowClick: (id: string) => void;
  isClickingRow?: boolean;
  fieldSort?: field;
  metodSort?: typeSort;
  changeSort: ChangeSortFunction;
  fieldFilter: field;
  queryFilter: string;
  changeFilter: ChangeFilterFunction;
}

const HierarchyTable: FC<HierarchyTableProps> = ({
  data,
  handleRowClick,
  isClickingRow = true,
  fieldSort,
  metodSort,
  changeSort,
  fieldFilter,
  queryFilter,
  changeFilter,
}) => {
  const columns = Object.keys(data[0] || {});

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>
              <div className={styles.table__in_head}>
                {column.toUpperCase()}
                <ButtonSort
                  fieldSort={fieldSort === column ? fieldSort : column}
                  metodSort={
                    fieldSort === column && metodSort
                      ? metodSort
                      : sortDirection.NONE
                  }
                  changeSort={changeSort}
                />
                <Filter queryFilter={fieldFilter === column ? queryFilter : ''} fieldFilter={column} changeFilter={changeFilter} />
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
            key={index}
            className={isClickingRow ? styles.table__row : ''}
            onClick={() => handleRowClick(item.id)}
          >
            {columns.map((column) => (
              <td key={column}>
                {typeof item === 'object' && item !== null && column in item
                  ? item[column]
                  : ''}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default HierarchyTable;
