import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './layouts/Layout';
import AccountsPage from './pages/AccountsPage/AccountsPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { ACCOUNTS } from './shared/router-path/routerPath';

const App = () => (
  <Routes>
    <Route path="*" element={<NotFoundPage />} />
    <Route path="/" element={<Layout />}>
      <Route index element={<Navigate to={ACCOUNTS} />} />
      <Route path={ACCOUNTS} element={<AccountsPage />} />
    </Route>
  </Routes>
);

export default App;
