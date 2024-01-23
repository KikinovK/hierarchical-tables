import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

const Layout = () => (
  <>
    <Header />
    <main className="flex-grow-1">
      <Container>
        <Outlet />
      </Container>
    </main>
  </>
);

export default Layout;
