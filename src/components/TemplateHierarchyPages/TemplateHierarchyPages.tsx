import { FC, ReactNode, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { fetchData } from '../../api/fetchData';
import { constDefault } from '../../shared/constants/default';
import { hierarchyData } from '../../shared/constants/hierarchyData';
import { paramApi } from '../../shared/constants/paramApi';
import { nameTable, rawData } from '../../type/type';
import HierarchyTable from '../HierarchyTable/HierarchyTable';
import PaginationTables from '../PaginationTables/PaginationTables';
import Title from '../Title/Title';

interface TemplateHierarchyPagesProps {
  title: ReactNode;
  nameTable: nameTable;
}

const TemplateHierarchyPages: FC<TemplateHierarchyPagesProps> = ({
  title,
  nameTable,
}) => {
  console.log('Table');
  const [data, setData] = useState<rawData[]>([]);
  const [currentPage, setCurrentPage] = useState(constDefault.CURRENT_PAGE);
  const [totalPages, setTotalPages] = useState(constDefault.TOTAL_PAGES);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const hierarchy = hierarchyData[nameTable];

  const handleRowClick = (id: string) => {
    if (hierarchy.path && hierarchy.filterKey) {
      navigate(`${hierarchy.path}?${hierarchy.filterKey}=${id}`);
    }
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    searchParams.set(paramApi.PAGE, page.toString());
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!searchParams.get(paramApi.PAGE_SIZE))
      searchParams.set(paramApi.PAGE_SIZE, constDefault.PAGE_SIZE.toString());
    if (!searchParams.get(paramApi.PAGE))
      searchParams.set(paramApi.PAGE, constDefault.CURRENT_PAGE.toString());
    setSearchParams(searchParams);

    const searchParamsArray = Array.from(searchParams.entries()).map(
      ([key, value]) => ({ key, value })
    );

    console.log('searchParamsArray', searchParamsArray);

    const { newData, totalPages, newCurrentPage } = fetchData(
      searchParamsArray,
      nameTable
    );
    setData(newData);
    setCurrentPage(newCurrentPage);
    setTotalPages(totalPages);
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
      <Row>
        <Col>
          <PaginationTables
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </Col>
      </Row>
    </>
  );
};

export default TemplateHierarchyPages;
