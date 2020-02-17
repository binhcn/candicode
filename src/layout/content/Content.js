import React from "react";
import { Layout, Breadcrumb, Row, Input } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './Content.css';

const propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

const isCodingPage = (path) => path.startsWith('/code-editor');

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

        <Breadcrumb separator=">">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>

        <Input.Search
          placeholder="Search"
          style={{ width: 400 }}
          size="large"
          onSearch={value => console.log(value)}
          enterButton="Search"
        />
      </Row>

      <div>
        {props.children}
      </div>
    </Layout.Content>
  );
}

Content.propTypes = propTypes;

export default withRouter(Content);