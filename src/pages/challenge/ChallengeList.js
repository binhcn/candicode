import React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import {
  List,
} from 'antd';

import {
  getAllChallenges,
} from "../../actions/actions.creator";
import ChallengeCard from './ChallengeCard';

class ChallengeList extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { search: params },
    } = this.props;
    this.props.getAllChallenges(params);
  }
  render() {
    return (
      <List
        grid={{ gutter: 8,
          sm: 1,
          md: 2,
          lg: 3, 
        }}
        dataSource={this.props.data}
        pagination={{
          onChange: page => {
          },
          pageSize: 6,
        }}
        renderItem={item => (
          <List.Item>
            <ChallengeCard item={item} />
          </List.Item>
        )}
      />
    );
  }
}

const mapStateToProps = state => ({
  data: state.challengeReducer.data,
});

const mapDispatchToProps = dispatch => ({
  getAllChallenges: params => dispatch(getAllChallenges(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChallengeList));
