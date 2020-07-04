import React from "react";
import { Layout, Row, Input, Radio, } from 'antd';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import './Content.css';
import Breadcrumb from './Breadcrumb';

class Content extends React.Component {

  state = {
    type: 'challenges',
  }

  searchKeyword = keyword => {
    const {
      location: { pathname: path },
    } = this.props;
    var params = keyword ? '?title=' + keyword : '';
    if (path.localeCompare('/') === 0) {
      this.props.history.push('/' + this.state.type + params);
    } else if (path.startsWith('/tutorials')) {
      this.props.history.push('/tutorials' + params);
    } else if (path.startsWith('/contests')) {
      this.props.history.push('/contests' + params);
    } else {
      this.props.history.push('/challenges' + params);
    }
  }

  onChangeRadio = e => {
    this.setState({
      type: e.target.value,
    });
  }

  render() {
    const {
      location: { pathname: path },
    } = this.props;

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
                <Input.Search
                  placeholder="Ex. Title"
                  size="large"
                  onSearch={keyword => this.searchKeyword(keyword)}
                  enterButton="Search"
                  allowClear={true}
                />
              </div>

              <Radio.Group className="home-search-type" onChange={this.onChangeRadio} defaultValue={this.state.type}>
                <Radio.Button value="challenges">Challenge</Radio.Button>
                <Radio.Button className="middle" value="tutorials">Tutorial</Radio.Button>
                <Radio.Button value="contests">Contest</Radio.Button>
              </Radio.Group>
            </div>
          </div>
          <div>
            {this.props.children}
          </div>
        </Layout.Content>
      )
    } else if (path.startsWith('/code-editor') || path.startsWith('/management')) {
      return (
        <Layout.Content>
          <div>
            {this.props.children}
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
              onSearch={keyword => this.searchKeyword(keyword)}
              enterButton="Search"
              allowClear={true}
            />
          </Row>

          <div style={{ minHeight: '80vh' }}>
            {this.props.children}
          </div>
        </Layout.Content>
      );
    }
  }
}

export default withRouter(Content);