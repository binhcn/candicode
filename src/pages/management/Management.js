import React from 'react';
import { connect } from "react-redux";
import { Layout, Menu, Icon } from 'antd';
import { withRouter, Route, Switch } from 'react-router-dom';

import './Management.css';
import Challenge from './challenge/Challenge';
import Tutorial from './tutorial/Tutorial';
import Contest from './contest/Contest';
import Statistics from './statistics/Statistics';

const { Content, Sider } = Layout;

class Management extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  handleMenuClick = path => {
    const { history } = this.props;
    history.push(path);
  }

  render() {
    return (
      <Layout className="management-layout">
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.props.location.pathname]}>
            <Menu.Item key="/management" onClick={() => this.handleMenuClick("/management")}>
              <Icon type="radar-chart" />
              <span>Statistics</span>
            </Menu.Item>
            <Menu.Item key="/management/challenges" onClick={() => this.handleMenuClick("/management/challenges")}>
              <Icon type="bulb" />
              <span>Challenges</span>
            </Menu.Item>
            <Menu.Item key="/management/tutorials" onClick={() => this.handleMenuClick("/management/tutorials")}>
              <Icon type="book" />
              <span>Tutorials</span>
            </Menu.Item>
            <Menu.Item key="/management/contests" onClick={() => this.handleMenuClick("/management/contests")}>
              <Icon type="fire" />
              <span>Contests</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '10px 10px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: '89vh' }}>
              <Switch>
                <Route path='/management/challenges' exact component={Challenge} />
                <Route path='/management/tutorials' exact component={Tutorial} />
                <Route path='/management/contests' exact component={Contest} />
                <Route path='/management' exact component={Statistics} />                
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Management));
