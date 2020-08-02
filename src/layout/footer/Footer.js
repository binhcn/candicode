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
            <img src='https://candicode-binh.s3-ap-southeast-1.amazonaws.com/public/footer.png' alt="logo" />
          </Link>
        </Col>
        <Col xs={12} md={7}>
          <h3 style={{paddingLeft:'20px'}}>
            <FormattedMessage id='CONTENT' />
          </h3>
          <ul>
            <li>
              <Link to="/challenges">
                <FormattedMessage id='challenge' />
              </Link>
            </li>
            <li>
              <Link to="/tutorials">
                <FormattedMessage id='tutorial' />
              </Link>
            </li>
            <li>
              <Link to="/contests">
                <FormattedMessage id='contest' />
              </Link>
            </li>
            <li>
              <Link to="/user-plans">
                <FormattedMessage id='upgrade' />
              </Link>
            </li>
          </ul>
        </Col>
        <Col xs={12} md={7}>
          <h3>
            <FormattedMessage id='CONTACT_US' />
          </h3>
          <div style={{margin: '30px'}}>
            <Icon type="facebook" style={{ fontSize: '32px', color: 'white', marginRight: '10px' }} />
            <Icon type="linkedin" style={{ fontSize: '32px', color: 'white' }} />
          </div>
          
          <div>
            <Select defaultValue={this.props.lang} style={{ width: 300 }} onChange={this.handleChange}>
              <Option value="en">
                <FormattedMessage id='english' />
              </Option>
              <Option value="vi">
                <FormattedMessage id='vietnamese' />
              </Option>
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