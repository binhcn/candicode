import React from 'react';
import { Row, Col, Icon, Select } from 'antd';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';

import './Footer.css';
import { translateLanguage } from '../../actions/actions.creator';
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

class Footer extends React.Component {
  handleChange = (value) => {
    this.props.translateLanguage(value);
  }

  render() {
    const {
      location: { pathname: path },
    } = this.props;
  
    if (isCodingPage(path)) return '';
  
    return (
      <Row className="footer">
        <Col xs={24} md={10} >
          <Link to="/">
            <img src='img/footer-logo.png' alt="logo" />
          </Link>
        </Col>
        <Col xs={12} md={7}>
          <h3 style={{paddingLeft:'20px'}}>
            <FormattedMessage id='content' />
          </h3>
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
          <h3>
            <FormattedMessage id='contact_us' />
          </h3>
          <div style={{margin: '30px'}}>
            <Icon type="facebook" style={{ fontSize: '32px', color: 'white', marginRight: '10px' }} />
            <Icon type="linkedin" style={{ fontSize: '32px', color: 'white' }} />
          </div>
          
          <div>
            <Select defaultValue={this.props.lang} style={{ width: 300 }} onChange={this.handleChange}>
              <Option value="en">English</Option>
              <Option value="vi">Vietnamese</Option>
            </Select>
          </div>
          
        </Col>
      </Row>
    );
  }
}

Footer.propTypes = propTypes;
const mapStateToProps = state => ({
  lang: state.userReducer.lang,
});
const mapDispatchToProps = dispatch => ({
  translateLanguage: (lang) => dispatch(translateLanguage(lang)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Footer));