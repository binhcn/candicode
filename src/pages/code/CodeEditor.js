import React from 'react';
import Editor from '@monaco-editor/react';
import { Input, Select, Button, Row, Col, Collapse } from 'antd';

const { Option } = Select;
const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export default function CodeEditor(props) {
  console.log(props);
  return (
    <div>

      <Input.Group style={{ margin: '2px' }}>
        <span>Language: </span>
        <Select defaultValue="Java" style={{ width: 200 }} >
          <Option key="java">Java</Option>
          <Option key="python">Python</Option>
          <Option key="sql">SQL</Option>
          <Option key="c++">C++</Option>
        </Select>
      </Input.Group>

      <div>
        <Editor height="78vh" width={`${props.editorWidth}px`} theme="dark" value={"function hello() {\n\talert('Hello world!');\n}"} language="python" />
      </div>
      
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
        <Col span={5}>
          <Button type="primary">Compile</Button>
        </Col>
        <Col span={4}>
          <Button type="primary">Submit</Button>
        </Col>
      </Row>
    </div>
  )
}