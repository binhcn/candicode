import React from 'react';
import { connect } from "react-redux";
import { Table, Popconfirm, Button, Tag, Icon, Modal } from 'antd';
import moment from 'moment';

import {
  deleteContest, handleContestModal, handleContest, getUserContests,
  handleRoundModal, handleUpdateRoundModal, handleDeleteRoundModal,
  getContestChallenges,
} from "../../../actions/actions.creator";
import { randomColor } from '../../../constants';
import ContestModal from './ContestModal';
import AddRound from './round/AddRound';
import DeleteRound from './round/DeleteRound';
import UpdateRound from './round/UpdateRound';
import './Contest.css';

class Contest extends React.Component {
  constructor(props) {
    super(props);
    this.props.getUserContests();
    this.props.getContestChallenges();
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'key',
        width: '5%',
      },
      {
        title: 'Title',
        dataIndex: 'title',
        width: '20%',
      },
      {
        title: 'Tag',
        dataIndex: 'tagList',
        width: '25%',
        render: tagList => {
          const html = tagList ? tagList.map((item, index) => {
            return (
              <Tag key={index} color={randomColor()}>
                {item}
              </Tag>
            )
          }) : '';
          return html;
        },
      },
      {
        title: 'Operation',
        dataIndex: 'operation',
        render: (text, record) => {
          return (
            <>
              <div>
                <Button type="link" onClick={() => this.showRoundModal(record)}>
                  <Icon type="plus-circle" />
                </Button>
                <Button type="link" onClick={() => this.showUpdateRoundModal(record)}>
                  <Icon type="edit" />
                </Button>
                <Button type="link" onClick={() => this.showDeleteRoundModal(record)}>
                  <Icon type="minus-circle" />
                </Button>
                Round
              </div>

              <div>
                <Button disabled={true} type="link" >
                  <Icon type="plus-circle" />
                </Button>
                <Button type="link" onClick={() => this.showModal(record)}>
                  <Icon type="edit" />
                </Button>
                <Popconfirm title="Sure to delete?"
                  onConfirm={() => this.props.deleteContest(record.id)}
                >
                  <Button type="link">
                    <Icon type="minus-circle" />
                  </Button>
                </Popconfirm>
                Contest
              </div>
            </>
          );
        },
      },
    ];
  }

  showModal = (record) => {
    if (record === null) {
      record = {
        id: '',
        title: "",
        maxRegister: -1,
        registrationDeadline: moment(),
        tagList: [],
        banner: null,
        imageUrl: "",
        description: "",
      }
    }
    this.props.handleContest(record);
    this.props.handleContestModal(true);
  };

  showRoundModal = (record) => {
    this.props.handleContest(record);
    this.props.handleRoundModal(true);
  };

  showUpdateRoundModal = (record) => {
    this.props.handleContest(record);
    this.props.handleUpdateRoundModal(true);
  };

  showDeleteRoundModal = (record) => {
    this.props.handleContest(record);
    this.props.handleDeleteRoundModal(true);
  };

  render() {
    return (
      <div>
        <Button onClick={() => this.showModal(null)} type="primary" style={{ marginBottom: 16 }}>
          Create contest
        </Button>
        {this.props.visible &&
          <Modal
            className="contest-modal"
            key="modal"
            title="Create contest"
            width="1200px"
            centered={true}
            visible={this.props.visible}
            onCancel={() => this.props.handleContestModal(false)}
            footer={null}
          >
            <ContestModal />
          </Modal>
        }
        {this.props.visibleRoundModal &&
          <Modal
            className="testcase-modal"
            key="round-modal"
            title="Add round"
            width="800px"
            visible={this.props.visibleRoundModal}
            onCancel={() => this.props.handleRoundModal(false)}
            footer={null}
          >
            <AddRound />
          </Modal>
        }
        {this.props.visibleUpdateRoundModal &&
          <Modal
            className="update-testcase-modal"
            key="update-round-modal"
            title="Update round"
            width="850px"
            visible={this.props.visibleUpdateRoundModal}
            onCancel={() => this.props.handleUpdateRoundModal(false)}
            footer={null}
          >
            <UpdateRound />
          </Modal>
        }
        {this.props.visibleDeleteRoundModal &&
          <Modal
            className="delete-testcase-modal"
            key="delete-round-modal"
            title="Delete round"
            width="800px"
            visible={this.props.visibleDeleteRoundModal}
            onCancel={() => this.props.handleDeleteRoundModal(false)}
            footer={null}
          >
            <DeleteRound />
          </Modal>
        }
        <Table
          bordered
          dataSource={this.props.data}
          columns={this.columns}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.contestReducer.data,
  visible: state.contestReducer.visible,
  visibleRoundModal: state.contestReducer.visibleRoundModal,
  visibleUpdateRoundModal: state.contestReducer.visibleUpdateRoundModal,
  visibleDeleteRoundModal: state.contestReducer.visibleDeleteRoundModal,
});

const mapDispatchToProps = dispatch => ({
  deleteContest: id => dispatch(deleteContest(id)),
  handleContestModal: status => dispatch(handleContestModal(status)),
  handleContest: record => dispatch(handleContest(record)),
  getUserContests: () => dispatch(getUserContests()),
  getContestChallenges: () => dispatch(getContestChallenges()),
  handleRoundModal: status => dispatch(handleRoundModal(status)),
  handleUpdateRoundModal: status => dispatch(handleUpdateRoundModal(status)),
  handleDeleteRoundModal: status => dispatch(handleDeleteRoundModal(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contest);