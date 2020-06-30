import React from 'react';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import {
  getTutorialComments, addTutorialComments,
} from "../../actions/actions.creator";

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value, onKeyPress }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} onKeyPress={onKeyPress} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

const Comments = ({ comments }) => {
  return (
    <div className="comments">
      {comments.length > 0 && <CommentList comments={comments} />}
    </div>
  )
}

class TutorialDiscussion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      value: '',
    };
    const {
      location: { pathname: path },
    } = this.props;
    const tutorialId = path.split('/').slice(-1)[0];
    this.props.getTutorialComments(tutorialId);
  }

  keyPressed = event => {
    if (event.key === "Enter") {
      this.handleSubmit()
    }
  }

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    var payload = {
      content: this.state.value,
    };

    var response = this.props.addTutorialComments({id: this.props.id, payload: payload});
    response.then(result => {
      setTimeout(() => {
        this.setState({
          submitting: false,
          value: '',
        });
      }, 100);
    });
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {

    const { submitting, value } = this.state;

    var commentList = this.props.comments.map(item => {
      return {
        author: item.author,
        avatar: item.avatar ? item.avatar : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: item.content,
        datetime: item.createdAt,
      }
    })

    return (
      <div>
        <Comment
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
              onKeyPress={this.keyPressed}
            />
          }
        />
        <Comments comments={commentList} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  comments: state.tutorialReducer.comments,
  id: state.tutorialReducer.id,
});

const mapDispatchToProps = dispatch => ({
  getTutorialComments: id => dispatch(getTutorialComments(id)),
  addTutorialComments: data => dispatch(addTutorialComments(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TutorialDiscussion));