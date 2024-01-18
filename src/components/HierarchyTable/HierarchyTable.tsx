import { FC } from 'react';
import { Table } from 'react-bootstrap';

import { mockData } from '../../type/type';

import styles from './style.module.css';

interface HierarchyTableProps {
  data: Array<mockData>;
  handleRowClick: (id: string) => void;
}

const HierarchyTable: FC<HierarchyTableProps> = ({ data, handleRowClick }) => {
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
            className={styles.table__row}
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
