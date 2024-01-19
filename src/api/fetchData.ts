import { mockAccountsData } from '../shared/constants/mockAccountsData';
import { mockCampaignsData } from '../shared/constants/mockCampaignsData';
import { mockProfilesData } from '../shared/constants/mockProfilesData';
import { nameTable, rawData } from '../type/type';

type param = {
  key: string;
  value: string;
};

const getTable = (name: nameTable): rawData[] => {
  if (name === 'accounts') return mockAccountsData;
  if (name === 'profiles') return mockProfilesData;
  if (name === 'campaigns') return mockCampaignsData;

  const invalidValue: never = name;
  throw new Error(`Unexpected name: ${invalidValue}`);
};

export const fetchData = (
  searchParams: param[],
  name: nameTable
): rawData[] => {
  let data = getTable(name);
  searchParams.forEach((param) => {
    const key = param.key;
    const value = param.value;
    if (key.includes('Id')) {
      data = data.filter((item) => item[key] === value);
    }
  });

  return data;
};
