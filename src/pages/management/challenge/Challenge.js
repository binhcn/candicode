import React from 'react';
import { connect } from "react-redux";
import { Table, Popconfirm, Button, Tag, Divider, Modal } from 'antd';
import {
  deleteChallenge, handleModal, handleChallenge, handleSourceModal,
  handleTestcaseModal, getAllChallenges,
} from "../../../actions/actions.creator";

import ChallengeModal from './ChallengeModal';
import SourceUpdate from './SourceUpdate';
import TestcaseUpdate from './TestcaseUpdate';
import './Challenge.css';

class Challenge extends React.Component {
  constructor(props) {
    super(props);
    this.props.getAllChallenges();
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
        title: 'Level',
        dataIndex: 'level',
        width: '15%',
        render: level => {
          var color = level === 'easy' ? 'blue' : (level === 'moderate' ? 'green' : 'red');
          return (
            <Tag key={level} color={color}>
              {level.toUpperCase()}
            </Tag>
          )
        },
      },
      {
        title: 'Language',
        dataIndex: 'language',
        width: '15%',
        render: languageSet => {
          var html = languageSet.map(item => {
            return (
              <Tag color={item.toLowerCase() === 'java' ? 'geekblue' : 'green'} key={item}>
                {item}
              </Tag>
            )
          })
          return html;
        },
      },
      {
        title: 'Operation',
        dataIndex: 'operation',
        render: (text, record) => {
          return (
            <span>
              <Button type="link" onClick={() => this.showModal(record)}>
                Edit info
              </Button>
              <Divider type="vertical" />
              <Button type="link" onClick={() => this.showTestcaseModal(record)}>
                Edit testcase
                </Button>
              <Divider type="vertical" />
              <Button type="link" onClick={() => this.showSourceModal(record)}>
                Edit language
                </Button>
              <Divider type="vertical" />
              <Popconfirm title="Sure to delete?"
                onConfirm={() => this.props.deleteChallenge(record.id)}
              >
                <Button type="link">
                  Delete
                </Button>
              </Popconfirm>
            </span>
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
        level: "",
        language: "",
        source: null,
        banner: null,
        imageUrl: "",

        targetPath: "",
        buildPath: "",

        testcaseInputFormat: "",
        testcaseOutputFormat: "",

        description: "",
      }
    }
    record = {...record, currentStep: 0};
    this.props.handleChallenge(record);
    this.props.handleModal(true);
  };

  showSourceModal = (record) => {
    this.props.handleChallenge(record);
    this.props.handleSourceModal(true);
  };

  showTestcaseModal = (record) => {
    this.props.handleChallenge(record);
    this.props.handleTestcaseModal(true);
  };

  render() {
    return (
      <div>
        <Button onClick={() => this.showModal(null)} type="primary" style={{ marginBottom: 16 }}>
          Create challenge
        </Button>
        { this.props.visible && 
          <Modal 
            className="challenge-modal"
            key="modal"
            title="Create challenge"
            centered={true}
            width="1200px"
            visible={this.props.visible}
            onCancel={() => this.props.handleModal(false)}
            footer={null}
          >
            <ChallengeModal />
          </Modal>
        }
        { this.props.visibleSourceModal && 
          <Modal 
            className="challenge-modal"
            key="source-modal"
            title="Update language source"
            centered={true}
            visible={this.props.visibleSourceModal}
            onCancel={() => this.props.handleSourceModal(false)}
            footer={null}
          >
            <SourceUpdate />
          </Modal>
        }
        { this.props.visibleTestcaseModal && 
          <Modal 
            className="testcase-modal"
            key="testcase-modal"
            title="Update testcase"
            width="800px"
            visible={this.props.visibleTestcaseModal}
            onCancel={() => this.props.handleTestcaseModal(false)}
            footer={null}
          >
            <TestcaseUpdate />
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
  data: state.challengeReducer.data,
  visible: state.challengeReducer.visible,
  visibleSourceModal: state.challengeReducer.visibleSourceModal,
  visibleTestcaseModal: state.challengeReducer.visibleTestcaseModal,
});

const mapDispatchToProps = dispatch => ({
  deleteChallenge: id => dispatch(deleteChallenge(id)),
  handleModal: status => dispatch(handleModal(status)),
  handleSourceModal: status => dispatch(handleSourceModal(status)),
  handleTestcaseModal: status => dispatch(handleTestcaseModal(status)),
  handleChallenge: record => dispatch(handleChallenge(record)),
  getAllChallenges: () => dispatch(getAllChallenges()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);