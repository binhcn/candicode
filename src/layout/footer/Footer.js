import React from 'react';
import { Row, Col, Icon } from 'antd';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import './Footer.css';

const propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

const isCodingPage = (path) => path.startsWith('/coding-challenge');

function Footer(props) {
  const {
    location: { pathname: path },
  } = props;

  if (isCodingPage(path)) return '';

  return (
    <Row className="footer">
      <Col xs={24} md={10}>
        <Link to="/">
          <img src='img/footer-logo.png' alt="logo" />
        </Link>
      </Col>
      <Col xs={12} md={7}>
        <h3>CONTENT</h3>
        <ul>
          <li>
            <a href="#0">Challenges</a>
          </li>
          <li>
            <a href="/">Tutorials</a>
          </li>
          <li>
            <a href="/contests">Contests</a>
          </li>
          <li>
            <Link to="/user-plan">Upgrade</Link>
          </li>
        </ul>
      </Col>
      <Col xs={12} md={7}>
      <h3>CONTACT WITH US</h3>
        <ul>
          <li>
            <Icon type="mail" /> &nbsp; +037 8424 666
          </li>
          <li>
            <Icon type="mobile" /> &nbsp; 1610228@hcmut.edu.vn
          </li>
        </ul>
        <h3>FOLLOW US</h3>
        <Icon type="facebook" style={{ fontSize: '32px', color: 'white', marginRight: '10px' }} />
        <Icon type="linkedin" style={{ fontSize: '32px', color: 'white' }} />
      </Col>
    </Row>
  );
}

Footer.propTypes = propTypes;

export default withRouter(Footer);