export interface mockAccount {
  [key: string]: string | undefined;
  id: string;
  email: string;
  authToken: string;
  creationDate: string;
}

export interface mockProfile {
  [key: string]: string | undefined;
  id: string;
  accountId: string;
  country: string;
  marketplace: string;
}

export interface mockCampaign {
  [key: string]: string | number | undefined;
  id: string;
  profileId: string;
  clicks: number;
  cost: number;
  date: string;
}
