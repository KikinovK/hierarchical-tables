export interface mockAccount {
  id: string;
  email: string;
  authToken: string;
  creationDate: string;
}

export interface mockProfile {
  id: string;
  accountId: string;
  country: string;
  marketplace: string;
}

export interface mockCampaign {
  id: string;
  profileId: string;
  clicks: number;
  cost: number;
  date: string;
}
