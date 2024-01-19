import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './layouts/Layout';
import AccountsPage from './pages/AccountsPage/AccountsPage';
import CampaignsPage from './pages/CampaignsPage/CampaignsPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProfilesPage from './pages/ProfilesPage/ProfilesPage';
import { ACCOUNTS, CAMPAIGN, PROFILES } from './shared/router-path/routerPath';

const App = () => (
  <Routes>
    <Route path="*" element={<NotFoundPage />} />
    <Route path="/" element={<Layout />}>
      <Route index element={<Navigate to={ACCOUNTS} />} />
      <Route path={ACCOUNTS} element={<AccountsPage />} />
      <Route path={PROFILES} element={<ProfilesPage />} />
      <Route path={CAMPAIGN} element={<CampaignsPage />} />
    </Route>
  </Routes>
);

export default App;
