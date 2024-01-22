import { constDefault } from '../shared/constants/default';
import { mockAccountsData } from '../shared/constants/mockAccountsData';
import { mockCampaignsData } from '../shared/constants/mockCampaignsData';
import { mockProfilesData } from '../shared/constants/mockProfilesData';
import { paramApi } from '../shared/constants/paramApi';
import { sortDirection } from '../shared/constants/sortDirection';
import { nameTable, rawData } from '../type/type';

type params = Record<string, string>;

const getTable = (name: nameTable): rawData[] => {
  switch (name) {
    case 'accounts':
      return mockAccountsData;
    case 'profiles':
      return mockProfilesData;
    case 'campaigns':
      return mockCampaignsData;
    default:
      throw new Error(`Invalid table name: ${name}`);
  }
};

export const fetchData = (
  searchParams: params,
  name: nameTable
): { newData: rawData[]; totalPages: number; newCurrentPage: number } => {
  const {
    [paramApi.PAGE]: pageParam,
    [paramApi.PAGE_SIZE]: pageSizeParam,
    [paramApi.FILTER]: field,
    [paramApi.ORDER]: order,
  } = searchParams;

  const currentPage = Number(pageParam) || constDefault.CURRENT_PAGE;
  const pageSize = Number(pageSizeParam) || constDefault.PAGE_SIZE;

  let data = getTable(name);

  for (const [key, value] of Object.entries(searchParams)) {
    if (key.includes('Id')) {
      data = data.filter((item) => item[key] === value);
    }
  }

  if (field && order) {
    data = data.sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (!aValue || !bValue || typeof aValue !== typeof bValue) {
        return 0;
      }

      if (order === sortDirection.ASCENDING) return aValue < bValue ? -1 : 1;

      if (order === sortDirection.DESCENDING) return aValue > bValue ? -1 : 1;

      return 0;
    });
  }

  const totalPages = Math.ceil(data.length / pageSize);
  const newData = data.slice(
    (currentPage - 1) * pageSize,
    (currentPage - 1) * pageSize + pageSize
  );
  return { newData, totalPages, newCurrentPage: currentPage };
};
