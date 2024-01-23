import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { ACCOUNTS, CAMPAIGN, PROFILES } from '../../shared/router-path/routerPath';

const Header = () => {
  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} to="/">Hierarchy Tables</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} to={ACCOUNTS}>ACCOUNTS</Nav.Link>
              <Nav.Link as={NavLink} to={PROFILES}>PROFILES</Nav.Link>
              <Nav.Link as={NavLink} to={CAMPAIGN}>CAMPAIGN</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
