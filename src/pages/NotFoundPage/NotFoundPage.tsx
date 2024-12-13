import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Title from '../../components/Title/Title';
import { ACCOUNTS } from '../../shared/router-path/routerPath';

const NotFoundPage = () => (
  <Row>
    <Col align="center">
      <Title>Not Found Page</Title>
      <Link to={ACCOUNTS}>Return to Accoounts</Link>
    </Col>
  </Row>
);

export default NotFoundPage;
