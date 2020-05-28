import React from 'react';
import { Row, Col, Icon, Select } from 'antd';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import './Footer.css';

const { Option } = Select;

const propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

const isCodingPage = (path) => {
  return path.startsWith('/code-editor') 
          || path.startsWith('/new-challenge') 
          || path.startsWith('/management');
}

function handleChange(value) {
  console.log(`selected ${value}`);
}

function Footer(props) {
  const {
    location: { pathname: path },
  } = props;

  if (isCodingPage(path)) return '';

  return (
    <Row className="footer">
      <Col xs={24} md={10} >
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
        <h3>CONTACT US</h3>
        <div style={{margin: '30px'}}>
          <Icon type="facebook" style={{ fontSize: '32px', color: 'white', marginRight: '10px' }} />
          <Icon type="linkedin" style={{ fontSize: '32px', color: 'white' }} />
        </div>
        
        <div>
          <Select defaultValue="english" style={{ width: 300 }} onChange={handleChange}>
            <Option value="english">English</Option>
            <Option value="vietnamese">Vietnamese</Option>
          </Select>
        </div>
        
      </Col>
    </Row>
  );
}

Footer.propTypes = propTypes;

export default withRouter(Footer);