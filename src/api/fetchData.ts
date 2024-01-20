import { constDefault } from '../shared/constants/default';
import { mockAccountsData } from '../shared/constants/mockAccountsData';
import { mockCampaignsData } from '../shared/constants/mockCampaignsData';
import { mockProfilesData } from '../shared/constants/mockProfilesData';
import { paramApi } from '../shared/constants/paramApi';
import { nameTable, rawData } from '../type/type';

type param = {
  key: string;
  value: string;
};

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
  searchParams: param[],
  name: nameTable
): { newData: rawData[]; totalPages: number; newCurrentPage: number } => {
  const currentPage = Number(
    searchParams.find((item) => item.key === paramApi.PAGE)?.value ||
      constDefault.CURRENT_PAGE
  );
  const pageSize = Number(
    searchParams.find((item) => item.key === paramApi.PAGE_SIZE)?.value ||
      constDefault.PAGE_SIZE
  );

  let data = getTable(name);

  searchParams.forEach((param) => {
    const key = param.key;
    const value = param.value;
    if (key.includes('Id')) {
      data = data.filter((item) => item[key] === value);
    }
  });

  const totalPages = Math.ceil(data.length / pageSize);
  const newData = data.slice(
    (currentPage - 1) * pageSize,
    (currentPage - 1) * pageSize + pageSize
  );

  return { newData, totalPages, newCurrentPage: currentPage };
};
