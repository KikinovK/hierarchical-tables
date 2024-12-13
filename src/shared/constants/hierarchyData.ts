import { CAMPAIGN, PROFILES } from '../router-path/routerPath';

export const hierarchyData = {
  accounts: {
    path: PROFILES,
    filterKey: 'accountId',
    paramKey: '',
  },
  profiles: {
    path: CAMPAIGN,
    filterKey: 'profileId',
    paramKey: 'accountId',
  },
  campaigns: {
    path: '',
    filterKey: '',
    paramKey: 'profileId',
  },
};
