import React from "react";
import { Breadcrumb, Icon } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import './Content.css';

const breadcrumbNameMap = {
  '/challenges': <FormattedMessage id='challenge' />,
  '/tutorials': <FormattedMessage id='tutorial' />,
  '/contests': <FormattedMessage id='contest' />,
  '/user-plans': <FormattedMessage id='upgrade' />,
  '/profile': <FormattedMessage id='profile' />,
};

function Navigation(props) {
  const { location } = props;
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">
        <Icon type="home" style={{ fontSize: '24px' }} />
      </Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return (
    <Breadcrumb separator=">">
      {breadcrumbItems}
    </Breadcrumb>
  );
}

export default withRouter(Navigation);