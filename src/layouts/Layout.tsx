import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Layout = () => (
  <>
    <Header />
    <main className="flex-grow-1 pt-3 pb-3">
      <Container>
        <Outlet />
      </Container>
    </main>
    <Footer />
  </>
);

export default Layout;
