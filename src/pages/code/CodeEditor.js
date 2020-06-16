import React from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import { connect } from "react-redux";
import {
  Input, Select, Button, Row, Col,
  Collapse, notification,
} from 'antd';

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

  render() {
    const languageOpt = this.props.contents.map((item, index) => (
      <Select.Option key={index} value={item.language}>{item.language}</Select.Option>
    ));
    var testcaseHtml = this.props.testcases.map((item, index) => (
      <Panel header={`Testcase ${index + 1} ${item.hidden ? '(hidden)' : ''}`} key={index}>
        <p>
          <span>Input: {item.hidden ? '' : item.input}</span>
          <span style={{marginLeft:'50px'}}>Output: {item.hidden ? '' : item.output}</span>
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
          <Input.Group style={{ margin: '2px' }}>
            <span>Language: </span>
            <Select
              defaultValue={this.props.contents[0].language}
              style={{ width: 200 }}
              onChange={this.handleLanguageChange}
            >
              {languageOpt}
            </Select>
          </Input.Group>
        }

        {this.props.contents[0] &&
          <ControlledEditor height="78vh" theme="light"
            value={this.props.contents[0].text}
            language={this.props.contents[0].language.toLowerCase()}
            onChange={this.handleEditorChange}
          />
        }

        <div id="testcase" className="collapse">
          <Collapse>
            {testcaseHtml}
          </Collapse>
        </div>

        <Row style={{ margin: '5px' }}>
          <Col span={15}>
            <Button type="danger" data-toggle="collapse" data-target="#testcase">Show testcases</Button>
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