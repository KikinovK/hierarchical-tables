import { FC } from 'react';
import { Table } from 'react-bootstrap';

import { rawData } from '../../type/type';

import styles from './style.module.css';

interface HierarchyTableProps {
  data: Array<rawData>;
  handleRowClick: (id: string) => void;
  isClickingRow?: boolean;
}

const HierarchyTable: FC<HierarchyTableProps> = ({ data, handleRowClick, isClickingRow = true }) => {
  const columns = Object.keys(data[0] || {});

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column.toUpperCase()}</th>
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
