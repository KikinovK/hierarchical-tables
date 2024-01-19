import { FC, ReactNode, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { fetchData } from '../../api/fetchData';
import { hierarchyData } from '../../shared/constants/hierarchyData';
import { nameTable, rawData } from '../../type/type';
import HierarchyTable from '../HierarchyTable/HierarchyTable';
import Title from '../Title/Title';

interface TemplateHierarchyPagesProps {
  title: ReactNode;
  nameTable: nameTable;
}

const TemplateHierarchyPages: FC<TemplateHierarchyPagesProps> = ({
  title,
  nameTable,
}) => {
  const [data, setData] = useState<rawData[]>([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const hierarchy = hierarchyData[nameTable];

  const handleRowClick = (id: string) => {
    if (hierarchy.path && hierarchy.filterKey) {
      navigate(`${hierarchy.path}/?${hierarchy.filterKey}=${id}`);
    }
  };

  useEffect(() => {
    const searchParamsArray = Array.from(searchParams.entries()).map(
      ([key, value]) => ({ key, value })
    );

    const dataNew = fetchData(searchParamsArray, nameTable);
    setData(dataNew);
  }, [searchParams, nameTable]);

  return (
    <>
      <Row>
        <Col>
          <Title>{title}</Title>
        </Col>
      </Row>
      <Row>
        <Col>
          <HierarchyTable
            data={data}
            handleRowClick={handleRowClick}
            isClickingRow={Boolean(hierarchy.path)}
          />
        </Col>
      </Row>
    </>
  );
};

export default TemplateHierarchyPages;
