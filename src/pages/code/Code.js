import React from 'react';
import { Row, Col } from 'antd';
import CodeSpec from './CodeSpec';
import CodeEditor from './CodeEditor';
import CodeOutput from './CodeOutput';

export default function Code() {
  return (
    <Row style={{background: 'white', padding: '0 2px'}}>
      <Col xs={24} md={12}>
        <CodeSpec />
      </Col>
      <Col xs={24} md={12}>
      <CodeEditor />
        <CodeOutput />
      </Col>
    </Row>
  )
}