import React from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import { connect } from "react-redux";
import {
  Select, Button, Row, Col, Icon,
  Collapse, notification, Drawer,
} from 'antd';
import { withRouter } from 'react-router-dom';

import './Code.css';
import {
  runCode, navigateRoundChallenge, getChallengeDetails, saveSubmission,
} from "../../actions/actions.creator";

const { Panel } = Collapse;

const customPanelStyle = {
  background: 'lightblue',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};

class CodeEditor extends React.Component {

  state = {
    code: '',
    language: '',
    details: [],
    isSubmitted: false,
    visible: false,
    theme: 'dark',
    submitStatus: true,

    compiled: '',
    doneWithin: 0,
    executionTime: 0,
    passed: 0,
    total: 0,
    submitAt: '',
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
      var response = this.props.runCode(payload);
      response.then(result => {
        this.setState({
          compiled: result.compiled,
          submitStatus: false,
        });
        if (result.compiled.toLowerCase() === 'success') {
          this.setState({
            details: result.details,
            isSubmitted: true,
            passed: result.passed,
            total: result.total,
            submitAt: result.submitAt,
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

  handleSubmit = () => {
    var { details, language } = this.state;
    var lang = language ? language : this.props.contents[0].language;
    if (this.state.code && lang) {
      var payload = {
        id: this.props.id,
        data: {
          code: this.state.code,
          language: lang,
          doneWithin: 0,
          compiled: this.state.compiled,
          passed: this.state.passed,
          total: this.state.total,
          executionTime: details.reduce((sum, item) => sum + item.executionTime, 0) / details.length,
          submitAt: this.state.submitAt,
        },
      }
      this.props.saveSubmission(payload);
    } else {
      notification['warning']({
        message: 'Candidate',
        description: "Please edit code",
        duration: 2,
      });
    }
  };

  handleLanguageChange = lang => {
    var content = this.props.contents.filter(item => item.language === lang);
    this.setState({
      language: lang,
      code: content[0].text,
    });
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
    var { currentRoundChallengeIdx, roundChallengeList } = this.props;
    this.props.navigateRoundChallenge(1);
    var challengeId = roundChallengeList[currentRoundChallengeIdx + 1].challengeId;
    this.props.history.push('/code-editor/' + challengeId);
    this.props.getChallengeDetails(challengeId);
  }

  prev = () => {
    var { currentRoundChallengeIdx, roundChallengeList } = this.props;
    this.props.navigateRoundChallenge(-1);
    var challengeId = roundChallengeList[currentRoundChallengeIdx - 1].challengeId;
    this.props.history.push('/code-editor/' + challengeId);
    this.props.getChallengeDetails(challengeId);
  }

  render() {
    var { currentRoundChallengeIdx, roundChallengeList, roles, contents, testcases } = this.props;
    var { details, isSubmitted, theme, language } = this.state;
    const languageOpt = contents.map((item, index) => (
      <Select.Option key={index} value={item.language}>{item.language}</Select.Option>
    ));
    var editorHtml = null;

    var contentId = this.props.contents.findIndex(item => language === item.language);
    if (contentId < 0) contentId = 0;
    editorHtml = this.props.contents[contentId] ?
      <ControlledEditor height='79vh'
        theme={theme}
        value={contents[contentId].text}
        language={contents[contentId].language.toLowerCase()}
        onChange={this.handleEditorChange}
      /> : null;

    var testcaseHtml = testcases.map((item, index) => (
      <Panel style={customPanelStyle}
        header={`Testcase ${index + 1} ${item.hidden ? '(hidden)' : ''}`} 
        key={index}
        extra={<Icon theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: '20px' }} type={isSubmitted 
                ? (details[index] && details[index].actualOutput === item.output 
                  ? 'check-circle' : 'close-circle') 
                : ''} />}
      >
        <p>
          <span>Input: {item.hidden ? '' : item.input}</span>
          <span style={{ marginLeft: '50px' }}>Output: {item.hidden ? '' : item.output}</span>
        </p>
        {isSubmitted &&
          <>
            <p>Actual output: {details[index].actualOutput}</p>
            <p>Runtime error: {details[index].error}</p>
          </>
        }
      </Panel>
    ));
    return (
      <div>
        {contents[0] &&
          <div className="options">
            <span>Language: </span>
            <Select
              defaultValue={contents[0].language}
              style={{ width: '100px', marginRight: '20px' }}
              onChange={this.handleLanguageChange}
            >
              {languageOpt}
            </Select>
            <span>Theme: </span>
            <Select
              defaultValue={theme}
              style={{ width: '100px' }}
              onChange={this.handleThemeChange}
            >
              <Select.Option value='light'>light</Select.Option>
              <Select.Option value='dark'>dark</Select.Option>
            </Select>
            {this.props.isContest &&
              <span className="navigation">
                <Button disabled={currentRoundChallengeIdx > 0 ? false : true} type="link">
                  <img className="prev" onClick={this.prev} alt="prev" src="/img/nxt-btn.png" width='40x' />
                </Button>
                <span className="current-round-challenge">Challenge {currentRoundChallengeIdx + 1}/{roundChallengeList.length}</span>
                <Button disabled={currentRoundChallengeIdx < roundChallengeList.length - 1 ? false : true} type="link">
                  <img alt="next" className="next" onClick={this.next} src="/img/nxt-btn.png" width='40x' />
                </Button>
              </span>
            }
          </div>
        }

        {editorHtml}

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
            <Button type="primary">Run code</Button>
          </Col>
          {roles && !roles.includes('admin') &&
            <Col span={4} onClick={this.handleSubmit}>
              <Button disabled={this.state.submitStatus} type="primary">Submit</Button>
            </Col>
          }
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  contents: state.codeEditorReducer.contents,
  id: state.codeEditorReducer.id,
  testcases: state.codeEditorReducer.testcases,
  isContest: state.codeEditorReducer.isContest,
  roundChallengeList: state.codeEditorReducer.roundChallengeList,
  currentRoundChallengeIdx: state.codeEditorReducer.currentRoundChallengeIdx,
  roles: state.userReducer.roles,
});

const mapDispatchToProps = dispatch => ({
  runCode: payload => dispatch(runCode(payload)),
  saveSubmission: payload => dispatch(saveSubmission(payload)),
  navigateRoundChallenge: difference => dispatch(navigateRoundChallenge(difference)),
  getChallengeDetails: (challengeId) => dispatch(getChallengeDetails(challengeId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CodeEditor));