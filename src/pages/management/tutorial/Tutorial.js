import React from 'react';
import { connect } from "react-redux";
import { Table, Popconfirm, Button, Tag, Divider, Modal } from 'antd';

import {
	deleteTutorial, handleTutorialModal, handleTutorial, getUserTutorials,
} from "../../../actions/actions.creator";
import { randomColor } from '../../../constants';
import TutorialModal from './TutorialModal';
import './Tutorial.css';

class Tutorial extends React.Component {
  constructor(props) {
    super(props);
    this.props.getUserTutorials();
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
        width: '30%',
        render: tagList => {
          const html = tagList.map((item, index) => {
            return (
              <Tag key={index} color={randomColor()}>
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
                Edit
              </Button>
              <Divider type="vertical" />
              <Popconfirm title="Sure to delete?"
                onConfirm={() => this.props.deleteTutorial(record.id)}
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
        tagList: [],
        banner: null,
        imageUrl: "",
        description: "",
      }
    }
    this.props.handleTutorial(record);
    this.props.handleTutorialModal(true);
  };

  render() {
    return (
      <div>
        <Button onClick={() => this.showModal(null)} type="primary" style={{ marginBottom: 16 }}>
          Create tutorial
        </Button>
        { this.props.visible &&
          <Modal
            className="tutorial-modal"
            key="modal"
            title="Create tutorial"
            width="1200px"
            centered={true}
            visible={this.props.visible}
            onCancel={() => this.props.handleTutorialModal(false)}
            footer={null}
          >
            <TutorialModal />
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
  data: state.tutorialReducer.data,
  visible: state.tutorialReducer.visible,
});

const mapDispatchToProps = dispatch => ({
  deleteTutorial: id => dispatch(deleteTutorial(id)),
  handleTutorialModal: status => dispatch(handleTutorialModal(status)),
  handleTutorial: record => dispatch(handleTutorial(record)),
  getUserTutorials: () => dispatch(getUserTutorials()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);