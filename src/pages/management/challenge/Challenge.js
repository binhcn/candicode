import React from 'react';
import { connect } from "react-redux";
import { Table, Popconfirm, Button, Tag, Modal, Icon } from 'antd';
import {
  deleteChallenge, handleModal, handleChallenge, handleSourceModal,
  handleTestcaseModal, getUserChallenges, handleDeleteLanguageModal,
  handleUpdateTestcaseModal, handleDeleteTestcaseModal, handleAddResultModal,
} from "../../../actions/actions.creator";

import ChallengeModal from './ChallengeModal';
import AddLanguageSource from './language-source/AddLanguageSource';
import DeleteLanguageSource from './language-source/DeleteLanguageSource';
import AddResult from './language-source/AddResult';
import AddTestcase from './testcase/AddTestcase';
import DeleteTestcase from './testcase/DeleteTestcase';
import UpdateTestcase from './testcase/UpdateTestcase';
import './Challenge.css';

class Challenge extends React.Component {
  constructor(props) {
    super(props);
    this.props.getUserChallenges();
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'key',
        width: '5%',
      },
      {
        title: 'Title',
        dataIndex: 'title',
        width: '25%',
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
        width: '20%',
        render: languageSet => {
          var html = languageSet.map(item => {
            if (item) {
              return (
                <Tag color={item === 'Java' ? 'geekblue' : 'green'} key={item}>
                  {item}
                </Tag>
              )
            } else {
              return null;
            }
            
          })
          return html;
        },
      },
      {
        title: 'Operation',
        dataIndex: 'operation',
        render: (text, record) => {
          return (
            <div>
              <div>
                <Button type="link" onClick={() => this.showTestcaseModal(record)}>
                  <Icon type="plus-circle" />
                </Button>
                <Button type="link" onClick={() => this.showUpdateTestcaseModal(record)}>
                  <Icon type="edit" />
                </Button>
                <Button type="link" onClick={() => this.showDeleteTestcaseModal(record)}>
                  <Icon type="minus-circle" />
                </Button>
                Testcase
              </div>

              <div>
                <Button type="link" onClick={() => this.showSourceModal(record)}>
                  <Icon type="plus-circle" />
                </Button>
                <Button disabled={true} type="link" >
                  <Icon type="edit" />
                </Button>
                <Button type="link" onClick={() => this.showDeleteLanguageModal(record)}>
                  <Icon type="minus-circle" />
                </Button>
                Language Source
              </div>

              <div>
                <Button disabled={true} type="link" >
                  <Icon type="plus-circle" />
                </Button>
                <Button type="link" onClick={() => this.showModal(record)}>
                  <Icon type="edit" />
                </Button>
                <Popconfirm title="Sure to delete?"
                  onConfirm={() => this.props.deleteChallenge(record.id)}
                >
                  <Button type="link">
                    <Icon type="minus-circle" />
                  </Button>
                </Popconfirm>
                Challenge
              </div>
            </div>
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
    this.props.handleChallenge(record);
    this.props.handleModal(true);
  };

  showSourceModal = (record) => {
    this.props.handleChallenge(record);
    this.props.handleSourceModal(true);
  };

  showDeleteLanguageModal = (record) => {
    this.props.handleChallenge(record);
    this.props.handleDeleteLanguageModal(true);
  };

  showTestcaseModal = (record) => {
    this.props.handleChallenge(record);
    this.props.handleTestcaseModal(true);
  };

  showUpdateTestcaseModal = (record) => {
    this.props.handleChallenge(record);
    this.props.handleUpdateTestcaseModal(true);
  };

  showDeleteTestcaseModal = (record) => {
    this.props.handleChallenge(record);
    this.props.handleDeleteTestcaseModal(true);
  };

  render() {
    return (
      <div>
        <Button onClick={() => this.showModal(null)} type="primary" style={{ marginBottom: 16 }}>
          Create challenge
        </Button>
        {this.props.visible &&
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
        {this.props.visibleSourceModal &&
          <Modal
            className="challenge-modal"
            key="add-source-modal"
            title="Add language source"
            centered={true}
            width="700px"
            visible={this.props.visibleSourceModal}
            onCancel={() => this.props.handleSourceModal(false)}
            footer={null}
          >
            <AddLanguageSource />
          </Modal>
        }
        {this.props.visibleDeleteLanguageModal &&
          <Modal
            className="testcase-modal"
            key="delete-source-modal"
            title="Delete language source"
            visible={this.props.visibleDeleteLanguageModal}
            onCancel={() => this.props.handleDeleteLanguageModal(false)}
            footer={null}
          >
            <DeleteLanguageSource />
          </Modal>
        }
        {this.props.visibleTestcaseModal &&
          <Modal
            className="testcase-modal"
            key="testcase-modal"
            title="Add testcase"
            width="800px"
            visible={this.props.visibleTestcaseModal}
            onCancel={() => this.props.handleTestcaseModal(false)}
            footer={null}
          >
            <AddTestcase />
          </Modal>
        }
        {this.props.visibleUpdateTestcaseModal &&
          <Modal
            className="update-testcase-modal"
            key="update-testcase-modal"
            title="Update testcase"
            width="800px"
            visible={this.props.visibleUpdateTestcaseModal}
            onCancel={() => this.props.handleUpdateTestcaseModal(false)}
            footer={null}
          >
            <UpdateTestcase />
          </Modal>
        }
        {this.props.visibleDeleteTestcaseModal &&
          <Modal
            className="delete-testcase-modal"
            key="delete-testcase-modal"
            title="Delete testcase"
            width="800px"
            visible={this.props.visibleDeleteTestcaseModal}
            onCancel={() => this.props.handleDeleteTestcaseModal(false)}
            footer={null}
          >
            <DeleteTestcase />
          </Modal>
        }
        {this.props.visibleAddResultModal &&
          <Modal
            className="add-source-modal"
            key="add-source-language-result"
            title="New source language result"
            width="800px"
            visible={this.props.visibleAddResultModal}
            onCancel={() => this.props.handleAddResultModal(false)}
            footer={null}
          >
            <AddResult />
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
  visibleDeleteLanguageModal: state.challengeReducer.visibleDeleteLanguageModal,
  visibleTestcaseModal: state.challengeReducer.visibleTestcaseModal,
  visibleUpdateTestcaseModal: state.challengeReducer.visibleUpdateTestcaseModal,
  visibleDeleteTestcaseModal: state.challengeReducer.visibleDeleteTestcaseModal,
  visibleAddResultModal: state.challengeReducer.visibleAddResultModal,
});

const mapDispatchToProps = dispatch => ({
  deleteChallenge: id => dispatch(deleteChallenge(id)),
  handleModal: status => dispatch(handleModal(status)),
  handleSourceModal: status => dispatch(handleSourceModal(status)),
  handleDeleteLanguageModal: status => dispatch(handleDeleteLanguageModal(status)),
  handleTestcaseModal: status => dispatch(handleTestcaseModal(status)),
  handleUpdateTestcaseModal: status => dispatch(handleUpdateTestcaseModal(status)),
  handleDeleteTestcaseModal: status => dispatch(handleDeleteTestcaseModal(status)),
  handleAddResultModal: status => dispatch(handleAddResultModal(status)),
  handleChallenge: record => dispatch(handleChallenge(record)),
  getUserChallenges: () => dispatch(getUserChallenges()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);