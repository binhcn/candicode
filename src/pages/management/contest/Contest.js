import React from 'react';
import { connect } from "react-redux";
import { Table, Popconfirm, Button, Tag, Divider, Modal } from 'antd';

import {
	deleteContest, handleContestModal, handleContest, getUserContests,
} from "../../../actions/actions.creator";
import { randomColor } from '../../../constants';
import ContestModal from './ContestModal';
import './Contest.css';

class Contest extends React.Component {
  constructor(props) {
    super(props);
    this.props.getUserContests();
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
        title: 'Round',
        dataIndex: 'round',
        width: '10%',
      },
      {
        title: 'Max register',
        dataIndex: 'maxRegister',
        width: '15%',
      },
      {
        title: 'Tag',
        dataIndex: 'tagList',
        width: '25%',
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
                onConfirm={() => this.props.deleteContest(record.id)}
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
    this.props.handleContest(record);
    this.props.handleContestModal(true);
  };

  render() {
    return (
      <div>
        <Button onClick={() => this.showModal(null)} type="primary" style={{ marginBottom: 16 }}>
          Create contest
        </Button>
        { this.props.visible && 
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
});

const mapDispatchToProps = dispatch => ({
  deleteContest: id => dispatch(deleteContest(id)),
  handleContestModal: status => dispatch(handleContestModal(status)),
  handleContest: record => dispatch(handleContest(record)),
  getUserContests: () => dispatch(getUserContests()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contest);