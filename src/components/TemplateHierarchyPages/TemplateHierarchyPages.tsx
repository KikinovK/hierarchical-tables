import { FC, ReactNode, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { fetchData, params } from '../../api/fetchData';
import { constDefault } from '../../shared/constants/default';
import { hierarchyData } from '../../shared/constants/hierarchyData';
import { paramApi } from '../../shared/constants/paramApi';
import { sortDirection } from '../../shared/constants/sortDirection';
import {
  ChangeFilterFunction,
  ChangeSortFunction,
  nameTable,
  rawData,
  typeSort,
} from '../../type/type';
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
  const [data, setData] = useState<rawData[]>([]);
  const [currentPage, setCurrentPage] = useState(constDefault.CURRENT_PAGE);
  const [totalPages, setTotalPages] = useState(constDefault.TOTAL_PAGES);
  const [fieldSort, setfieldSort] = useState('');
  const [metodSort, setMetodSort] = useState<typeSort>(sortDirection.NONE);
  const [fieldFilter, setFieldFilter] = useState('');
  const [queryFilter, setQueryFilter] = useState('');
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

  const onChangeSort: ChangeSortFunction = ({ fieldSort, metodSort }) => {
    if (metodSort === sortDirection.NONE) {
      setfieldSort(fieldSort.toString());
      searchParams.delete(paramApi.SORT);

      setMetodSort(metodSort);
      searchParams.delete(paramApi.ORDER);
    } else {
      setfieldSort(fieldSort.toString());
      searchParams.set(paramApi.SORT, fieldSort.toString());

      setMetodSort(metodSort);
      searchParams.set(paramApi.ORDER, metodSort.toString());
    }

    setSearchParams(searchParams);
  };

  const onChangeFilter: ChangeFilterFunction = ({
    fieldFilter,
    queryFilter,
  }) => {
    if (!queryFilter) {
      setFieldFilter('');
      setQueryFilter('');

      searchParams.delete(paramApi.FILTER);
    } else {
      setFieldFilter(fieldFilter.toString());
      setQueryFilter(queryFilter);

      searchParams.set(paramApi.FILTER, encodeURI(`${fieldFilter}:${queryFilter}`));
    }

    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!searchParams.get(paramApi.PAGE_SIZE))
      searchParams.set(paramApi.PAGE_SIZE, constDefault.PAGE_SIZE.toString());
    if (!searchParams.get(paramApi.PAGE))
      searchParams.set(paramApi.PAGE, constDefault.CURRENT_PAGE.toString());
    setSearchParams(searchParams);

    const searchParamsArray: params = Array.from(searchParams.entries()).reduce(
      (acc, [key, value]) => Object.assign(acc, { [key]: decodeURIComponent(value) }),
      {}
    );

    const {
      [paramApi.SORT]: fieldSort,
      [paramApi.ORDER]: order,
      [paramApi.FILTER]: filter,
    } = searchParamsArray;

    setfieldSort(fieldSort);
    setMetodSort(order as typeSort);

    if (filter) {
      const [fieldFilter, query] = filter.split(":");
      setFieldFilter(fieldFilter);
      setQueryFilter(query);
    }

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
            fieldSort={fieldSort}
            metodSort={metodSort}
            changeSort={onChangeSort}
            fieldFilter={fieldFilter}
            queryFilter={queryFilter}
            changeFilter={onChangeFilter}
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
