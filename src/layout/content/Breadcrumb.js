import React from "react";
import { Breadcrumb, Icon } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import './Content.css';

const breadcrumbNameMap = {
  '/challenges': 'Challenges',
  '/challenges/language-proficiency': 'Language proficiency',
  '/user-plans': 'User plans',
  '/login': 'Login',
  '/signup': 'Sign up',
  '/new-challenge': 'New challenge',
  '/profile': 'Profile',
};

function Content(props) {
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

export default withRouter(Content);