import React from "react";
import { Layout, Row, Input, Radio, } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';

import './Content.css';
import Breadcrumb from './Breadcrumb';
import {
  getAllChallenges, getAllTutorials, getAllContests,
} from "../../actions/actions.creator";

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
      this.props.getAllTutorials(params);
    } else if (path.startsWith('/contests')) {
      this.props.history.push('/contests' + params);
      this.props.getAllContests(params);
    } else {
      this.props.history.push('/challenges' + params);
      this.props.getAllChallenges(params);
    }
  }

  onChangeRadio = e => {
    this.setState({
      type: e.target.value,
    });
  }

  render() {
    const {
      location: { pathname: path }, history,
    } = this.props;

    var lsearch = <FormattedMessage id='contest' />;

    if (path.localeCompare('/index.html') === 0) {
      history.push('/');
      return '';
    } else if (path.localeCompare('/') === 0) {
      return (
        <Layout.Content className="content-background">
          <div className="hero_home version_1">
            <div className="content">
              <h3>
                <FormattedMessage id='FIGHT_CODING' />
              </h3>
              <p></p>
              <div id="custom-search-input">
                <Input.Search
                  size="large"
                  onSearch={keyword => this.searchKeyword(keyword)}
                  enterButton={lsearch}
                  allowClear={true}
                />
              </div>

              <Radio.Group className="home-search-type" onChange={this.onChangeRadio} defaultValue={this.state.type}>
                <Radio.Button value="challenges">
                  <FormattedMessage id='challenge' />
                </Radio.Button>
                <Radio.Button className="middle" value="tutorials">
                  <FormattedMessage id='tutorial' />
                </Radio.Button>
                <Radio.Button value="contests">
                  <FormattedMessage id='contest' />
                </Radio.Button>
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
              placeholder='Search by title'
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

const mapStateToProps = state => ({
  data: state.challengeReducer.data,
});

const mapDispatchToProps = dispatch => ({
  getAllChallenges: params => dispatch(getAllChallenges(params)),
  getAllTutorials: params => dispatch(getAllTutorials(params)),
  getAllContests: params => dispatch(getAllContests(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Content));