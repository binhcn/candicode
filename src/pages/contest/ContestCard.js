import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import moment from 'moment';
import {
  Card, Divider, Button, Tag,
} from 'antd';
import { prepareContestChallenges } from '../../actions/actions.creator';

import { randomBanner, randomColor } from '../../constants';

class ContestCard extends React.Component {

  render() {
    var flag = true;
    var { rounds, banner } = this.props;
    var selectedRoundId = rounds ? rounds.findIndex(item => {
      var now = moment();
      console.log(now.diff(item.startsAt, 'minutes'))
      return now > moment(item.startsAt) && now < moment(item.endsAt);
    }) : -1;
    var html = rounds ? rounds.map((item, index) => {
      return (
        <div key={index} className={selectedRoundId === index ? '' : 'other-rounds'}>
          <p className="header">
            Round {index + 1}
            {
              selectedRoundId === index ?
                <Tag className="status" color="#87d068">Ongoing</Tag> : null
            }
          </p>
          <p>Number of challenges: {item.challenges.length}</p>
          <p> Start at:
            <Tag color={randomColor()}>
              {item.startsAt.substring(0, item.startsAt.length - 7)}
            </Tag>
          </p>
          <p> End at:
            <Tag color={randomColor()}>
              {item.endsAt.substring(0, item.endsAt.length - 7)}
            </Tag>
          </p>
          <Divider style={{ margin: '8px 0' }} />
        </div>
      )
    }) : null;
    var firstRoundChallengeId = rounds && selectedRoundId > -1 ? 
      rounds[selectedRoundId].challenges[0].challengeId : '';
    var roundChallengeList = rounds && selectedRoundId > -1 ? 
    rounds[selectedRoundId].challenges : '';
    return (
      <Card
        className="contest-card"
        style={{ margin: '1vh auto' }}
        cover={
          <img
            alt="example"
            src={banner ? banner : randomBanner()}
            height='150px'
          />
        }
      >
        {html}

        {
          flag ?
            <>
              <p className="register">REGISTERED</p>
              <Link to={"/code-editor/" + firstRoundChallengeId}>
                <Button type="primary" 
                    onClick={() => this.props.prepareContestChallenges(roundChallengeList)}>
                      Fight
                </Button>
              </Link>
            </>
            :
            <Button type="danger" >
              Register
          </Button>
        }

      </Card>
    );
  }
}

const mapStateToProps = state => ({
  banner: state.contestReducer.banner,
  rounds: state.contestReducer.rounds,
});

const mapDispatchToProps = dispatch => ({
  prepareContestChallenges: (arr) => dispatch(prepareContestChallenges(arr)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContestCard);
