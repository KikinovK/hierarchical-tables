import { mockAccount, mockCampaign, mockProfile } from './interface';

export type rawData = mockAccount | mockProfile | mockCampaign;

export type nameTable = 'accounts' | 'profiles' | 'campaigns';

export type filed = keyof rawData;

export type typeSort = 'none' | 'asc' | 'desc';
