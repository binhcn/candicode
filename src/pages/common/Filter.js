import React from 'react';
import { connect } from "react-redux";
import {
  Drawer, Form, Button, DatePicker,
  Icon, Select,
} from 'antd';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { TAG_SET, LANGUAGE_SET, LEVEL_SET } from '../../constants';
import {
  getAllChallenges, getAllTutorials, getAllContests,
} from "../../actions/actions.creator";

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
    };
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        var { title, author, tag, language, level, start, end } = values;
        var params = '';
        if (title.length > 0) {
          params += '&title=' + title.join();
        }
        if (author) {
          params += '&author=' + author.join();
        }
        if (tag) {
          params += '&tag=' + tag.join();
        }
        if (language) {
          params += '&language=' + language.join();
        }
        if (level) {
          params += '&level=' + level.join();
        }
        if (start) {
          params += '&start=' + start.format('YYYY-MM-DD%20HH:mm:ss.SSS');
        }
        if (end) {
          params += '&end=' + end.format('YYYY-MM-DD%20HH:mm:ss.SSS');
        }
        params = params ? '?' + params.substring(1) : '';
        const {
          location: { pathname: path },
        } = this.props;
        if (path.startsWith('/tutorials')) {
          this.props.getAllTutorials(params);
          this.props.history.push('/tutorials' + params);
        } else if (path.startsWith('/contests')) {
          this.props.getAllContests(params);
          this.props.history.push('/contests' + params);
        } else { 
          this.props.getAllChallenges(params);
          this.props.history.push('/challenges' + params);
        }       
      }
      this.onClose();
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 8,
          offset: 16,
        },
      },
    };
    const tagOpt = TAG_SET.sort().map(level => (
      <Select.Option key={level} value={level}>{level}</Select.Option>
    ));

    const languageOpt = LANGUAGE_SET.sort().map(language => (
      <Select.Option key={language} value={language}>{language}</Select.Option>
    ));

    const levelOpt = LEVEL_SET.map(level => (
      <Select.Option key={level} value={level}>{level}</Select.Option>
    ));

    const {
      location: { search },
    } = this.props;
    var params = search.substring(1).split('=');
    var title = params[0].toLowerCase() === 'title' ? params[1] : '';
    var tag = params[0].toLowerCase() === 'tag' ? params[1] : '';
    return (
      <div>
        <Button className="filter" type="primary" onClick={this.showDrawer}>
          <Icon type="filter" />
          <FormattedMessage id='filter' />
        </Button>
        <Drawer
          title="Filter"
          width='30%'
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>

            <Form.Item label="Title">
              {getFieldDecorator('title', {
                initialValue: title ? [title] : [],
              })(
                <Select mode="tags" />
              )}
            </Form.Item>

            <Form.Item label="Author">
              {getFieldDecorator('author', {
              })(
                <Select mode="tags" />
              )}
            </Form.Item>

            <Form.Item label="Level">
              {getFieldDecorator('level', {
              })(
                <Select mode="tags" >
                  {levelOpt}
                </Select>
              )}
            </Form.Item>

            <Form.Item label="Language">
              {getFieldDecorator('language', {
              })(
                <Select mode="tags" >
                  {languageOpt}
                </Select>
              )}
            </Form.Item>

            <Form.Item label="Tag">
              {getFieldDecorator('tag', {
                initialValue: tag ? [tag] : [],
              })(
                <Select mode="tags" >
                  {tagOpt}
                </Select>
              )}
            </Form.Item>

            <Form.Item label="Start">
              {getFieldDecorator('start', {
              })(<DatePicker />)}
            </Form.Item>

            <Form.Item label="End">
              {getFieldDecorator('end', {
              })(<DatePicker />)}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button htmlType="submit" type="primary">
                <FormattedMessage id='to_filter' />
              </Button>
            </Form.Item>

          </Form>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => ({

});
const mapDispatchToProps = dispatch => ({
  getAllChallenges: params => dispatch(getAllChallenges(params)),
  getAllTutorials: params => dispatch(getAllTutorials(params)),
  getAllContests: params => dispatch(getAllContests(params)),
});

const WrappedFilter = Form.create({ name: 'filter' })(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(Filter))
);

export default WrappedFilter;
