import React from 'react';
import { connect } from "react-redux";
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
    this.props.getAllChallenges();
  }
  render() {
    return (
      <List
        grid={{ gutter: 8, column: 3 }}
        dataSource={this.props.data}
        pagination={{
          onChange: page => {
          },
          pageSize: 9,
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
  getAllChallenges: () => dispatch(getAllChallenges()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeList);
