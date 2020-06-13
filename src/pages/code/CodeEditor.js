import React from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import { connect } from "react-redux";
import { Input, Select, Button, Row, Col, Collapse, notification, } from 'antd';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
class CodeEditor extends React.Component {

  state = {
    code: '',
    language: this.props.contents[0] ? this.props.contents[0].language : null,
  }

  handleEditorChange = (event, value) => {
    this.setState({code: value});
  };
  
  handleCompile = () => {
    if (this.state.code && this.state.language) {
      var payload = {
        id: this.props.id,
        data: this.state
      }
      console.log(payload)
    } else {
      notification['warning']({
        message: 'Candidate',
        description: "Please edit code",
        duration: 2,
      });
    }
  };

  handleLanguageChange = lang => {
    this.setState({language: lang});
  }

  render() {
    const languageOpt = this.props.contents.map((item, index) => (
      <Select.Option key={index} value={item.language}>{item.language}</Select.Option>
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
            <Panel header="Testcase 1" key="1">
              <p>{text}</p>
            </Panel>
            <Panel header="Testcase 2" key="2">
              <p>{text}</p>
            </Panel>
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
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(CodeEditor);