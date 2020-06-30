import React from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import { connect } from "react-redux";
import {
  Select, Button, Row, Col,
  Collapse, notification, Drawer,
} from 'antd';

import './Code.css';
import {
  createSubmission,
} from "../../actions/actions.creator";

const { Panel } = Collapse;

class CodeEditor extends React.Component {

  state = {
    code: '',
    language: '',
    details: [],
    isSubmitted: false,
    visible: false,
    theme: 'dark',
  }

  handleEditorChange = (event, value) => {
    this.setState({ code: value });
  };

  handleCompile = () => {
    var language = this.state.language ? this.state.language : this.props.contents[0].language;
    if (this.state.code && language) {
      var payload = {
        id: this.props.id,
        data: {
          code: this.state.code,
          language: language,
        },
      }
      var response = this.props.createSubmission(payload);
      response.then(result => {
        if (result.compiled === 'Success') {
          this.setState({
            details: result.details,
            isSubmitted: true,
          });
          notification[result.passed === result.total ? 'success' : 'error']({
            message: 'Candicode',
            description: `The submission passed ${result.passed}/${result.total}`,
          });
        } else {
          notification['error']({
            message: `Compiled error`,
            description: result.error,
            duration: 0,
          });
        }
      })
    } else {
      notification['warning']({
        message: 'Candidate',
        description: "Please edit code",
        duration: 2,
      });
    }
  };

  handleLanguageChange = lang => {
    this.setState({ language: lang });
  }

  handleThemeChange = theme => {
    this.setState({ theme: theme });
  }

  showTestcase = (status) => {
    this.setState({
      visible: status,
    })
  }

  next = () => {
    console.log("next");
  }

  prev = () => {

  }

  render() {
    const languageOpt = this.props.contents.map((item, index) => (
      <Select.Option key={index} value={item.language}>{item.language}</Select.Option>
    ));
    var testcaseHtml = this.props.testcases.map((item, index) => (
      <Panel header={`Testcase ${index + 1} ${item.hidden ? '(hidden)' : ''}`} key={index}>
        <p>
          <span>Input: {item.hidden ? '' : item.input}</span>
          <span style={{ marginLeft: '50px' }}>Output: {item.hidden ? '' : item.output}</span>
        </p>
        {this.state.isSubmitted &&
          <>
            <p>Actual output: {this.state.details[index].actualOutput}</p>
            <p>Runtime error: {this.state.details[index].error}</p>
          </>
        }
      </Panel>
    ));
    return (
      <div>
        {this.props.contents[0] &&
          <div className="options">
              <span>Language: </span>
              <Select
                defaultValue={this.props.contents[0].language}
                style={{ width:'100px', marginRight:'20px' }}
                onChange={this.handleLanguageChange}
              >
                {languageOpt}
              </Select>
              <span>Theme: </span>
              <Select
                defaultValue={this.state.theme}
                style={{ width:'100px' }}
                onChange={this.handleThemeChange}
              >
                <Select.Option value='light'>light</Select.Option>
                <Select.Option value='dark'>dark</Select.Option>
              </Select>
              <span className="navigation">
                <img className="prev" onClick={this.prev} alt="prev" src="/img/nxt-btn.png" width='40x' />
                <img alt="next" className="next" onClick={this.next} src="/img/nxt-btn.png" width='40x' />
              </span>
          </div>
        }

        {this.props.contents[0] &&
          <ControlledEditor height="79vh"
            theme={this.state.theme}
            value={this.props.contents[0].text}
            language={this.props.contents[0].language.toLowerCase()}
            onChange={this.handleEditorChange}
          />
        }

        <Drawer
          className="testcase-drawer"
          title='Testcase'
          placement='left'
          closable={true}
          onClose={() => this.showTestcase(false)}
          visible={this.state.visible}
          width='40%'
        >
          <Collapse>
            {testcaseHtml}
          </Collapse>
        </Drawer>

        <Row style={{ margin: '5px' }}>
          <Col span={15}>
            <Button type="danger" onClick={() => this.showTestcase(true)} data-target="#testcase">Show testcases</Button>
          </Col>
          <Col span={5} onClick={this.handleCompile}>
            <Button type="primary">Compile</Button>
          </Col>
          <Col span={4}>
            <Button type="primary">Submit</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  contents: state.codeEditorReducer.contents,
  id: state.codeEditorReducer.id,
  testcases: state.codeEditorReducer.testcases,
});

const mapDispatchToProps = dispatch => ({
  createSubmission: payload => dispatch(createSubmission(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CodeEditor);