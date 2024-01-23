import { Col, Container, Navbar, Row } from 'react-bootstrap';

import GitHubIcon from '../../assets/icon/github.svg?react';

import styles from './style.module.css';

const Footer = () => {
  return (
    <footer  className="mt-auto pt-3 pb-3">
      <Container>
        <Row>
          <Col className="d-flex justify-content-center align-items-center">2024</Col>
          <Col className="d-flex justify-content-center align-items-center" xs="auto">
            <Navbar.Brand href="https://github.com/KikinovK" className={styles.link_icon}>
              <GitHubIcon />
            </Navbar.Brand>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
