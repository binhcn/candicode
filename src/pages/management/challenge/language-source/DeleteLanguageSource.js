import React from 'react';
import { connect } from "react-redux";
import { Form, Button, Select } from 'antd';

import '../Challenge.css';
import {
  deleteLanguage, handleDeleteLanguageModal,
} from "../../../../actions/actions.creator";

class DeleteLanguage extends React.Component {
  state = {
    removedSource: "",
  };

  handleChange = removedSource => {
    this.setState({ removedSource });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        var data = {...values};
        this.props.deleteLanguage({data: data, id: this.props.id});
        this.props.handleDeleteLanguageModal(false);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    
    const { removedSource } = this.state;
    const filteredOptions = this.props.language.filter(item => removedSource !== item);

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} className="challenge-source-modal">
        <Form.Item label="Remove source:" hasFeedback>
          {getFieldDecorator('language', {
            rules: [{ required: true, message: 'Please select its language!' }],
          })(
            <Select
              placeholder="Language inserted are removed"
              onChange={this.handleChange}
            >
              {filteredOptions.map(item => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
          Finish
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  language: state.challengeReducer.language,
  id: state.challengeReducer.id,
});
const mapDispatchToProps = dispatch => ({
  deleteLanguage: payload => dispatch(deleteLanguage(payload)),
  handleDeleteLanguageModal: status => dispatch(handleDeleteLanguageModal(status)),
});

const WrappedDeleteLanguage = Form.create({ name: 'deleteLanguage' })(
  connect(mapStateToProps, mapDispatchToProps)(DeleteLanguage)
);

export default WrappedDeleteLanguage;