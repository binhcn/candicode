import React from "react";
import { Layout, Row, Input } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import './Content.css';
import Breadcrumb from './Breadcrumb';

const propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

function Content(props) {
  const {
    location: { pathname: path },
  } = props;

  if (path.localeCompare('/') === 0) {
    return (
      <Layout.Content className="content-background">
        <div className="hero_home version_1">
          <div className="content">
            <h3>
              <FormattedMessage id='fight_coding' />
            </h3>
            <p></p>
            <div id="custom-search-input">
              <div className="input-group">
                <input type="text" className=" search-query" placeholder="Ex. Name, Specialization ...." />
                <input type="submit" className="btn_search" value="Search" />
              </div>
              <ul>
                <li>
                  <input type="radio" id="all" name="radio_search" value="all" defaultChecked />
                  <label htmlFor="all">All</label>
                </li>
                <li>
                  <input type="radio" id="challenge" name="radio_search" value="challenge" />
                  <label htmlFor="challenge">Challenges</label>
                </li>
                <li>
                  <input type="radio" id="tutorial" name="radio_search" value="tutorial" />
                  <label htmlFor="tutorial">Tutorials</label>
                </li>
                <li>
                  <input type="radio" id="contest" name="radio_search" value="contest" />
                  <label htmlFor="contest">Contests</label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          {props.children}
        </div>
      </Layout.Content>
    )
  } else if (path.startsWith('/code-editor') || path.startsWith('/management')) {
    return (
      <Layout.Content>
        <div>
          {props.children}
        </div>
      </Layout.Content>
    );
  } else {
    return (
      <Layout.Content className="content-background">
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

        <div style={{ minHeight: '80vh' }}>
          {props.children}
        </div>
      </Layout.Content>
    );
  }
}

Content.propTypes = propTypes;

export default withRouter(Content);