import React from "react";
import { Layout, Row, Input } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './Content.css';
import Breadcrumb from './Breadcrumb';

const propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

const isCodingPage = (path) => {
  return path.startsWith('/code-editor') || path.startsWith('/new-challenge');
};

function Content(props) {
  const {
    location: { pathname: path },
  } = props;

  if (isCodingPage(path)) return (
    <Layout.Content>
      <div>
        {props.children}
      </div>
    </Layout.Content>
  );

  return (
    <Layout.Content >
      <Row type="flex" justify="space-between">

        <Breadcrumb />

        <Input.Search
          placeholder="Search"
          style={{ width: 400 }}
          size="large"
          onSearch={value => console.log(value)}
          enterButton="Search"
        />
      </Row>

      <div style={{minHeight: '80vh'}}>
        {props.children}
      </div>
    </Layout.Content>
  );
}

Content.propTypes = propTypes;

export default withRouter(Content);