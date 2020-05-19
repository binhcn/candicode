import React from 'react';
import { connect } from "react-redux";
import { Table, Popconfirm, Button, Tag, Divider, Modal } from 'antd';
import {
	deleteChallenge, handleModal, handleChallenge
} from "../../../actions/actions.creator";

import ChallengeModal from './ChallengeModal';
import './Challenge.css';

class Challenge extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'id',
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
              <Button type="link">
                Edit
              </Button>
              <Divider type="vertical" />
              <Button type="link">
                Add testcase
                </Button>
              <Divider type="vertical" />
              <Button type="link">
                Add language
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

  render() {
    return (
      <div>
        <Button onClick={() => this.showModal(null)} type="primary" style={{ marginBottom: 16 }}>
          Create challenge
        </Button>
        { this.props.visible && <Modal 
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
        </Modal> }
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
});

const mapDispatchToProps = dispatch => ({
  deleteChallenge: id => dispatch(deleteChallenge(id)),
  handleModal: status => dispatch(handleModal(status)),
  handleChallenge: record => dispatch(handleChallenge(record)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);