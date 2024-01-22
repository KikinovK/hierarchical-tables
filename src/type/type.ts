import { mockAccount, mockCampaign, mockProfile } from './interface';

export type rawData = mockAccount | mockProfile | mockCampaign;

export type nameTable = 'accounts' | 'profiles' | 'campaigns';

export type field = keyof rawData;

export type typeSort = 'none' | 'asc' | 'desc';

export type ChangeSortFunction = ({
  fieldSort,
  metodSort,
}: {
  fieldSort: field;
  metodSort: typeSort;
}) => void;
