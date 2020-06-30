import React from 'react';
import { connect } from "react-redux";
import { Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';

import './Contest.css';
import { getContestDetails } from '../../actions/actions.creator';
import Sidebar from '../common/Sidebar';

class ContestDetails extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname: path },
    } = this.props;
    const contestId = path.split('/').slice(-1)[0];
    console.log(contestId);
    // this.props.getContestDetails(contestId);
  }

  render() {
    return (
      <Row className="container-fluid" gutter={32}>
        <Col span={18} className="contest-details">
          
        </Col>
        <Col span={6}>
          <Sidebar />
        </Col>

      </Row>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  getContestDetails: (contestId) => dispatch(getContestDetails(contestId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContestDetails));
