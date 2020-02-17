import React from 'react';
import './Home.css';
import { Card, Row, Col } from 'antd';

export default function Home() {
  return (
    <div className="container-fluid">

      <Row gutter={16} className="intro">
        <Col span={8}>
          <Card
            cover={
              <img
                alt="Get knowledge"
                src="img/icon-home-1.svg"
              />
            }
            bordered={false}
          >
            <Card.Meta
              title="GET KNOWLEGDE"
              description="We provides a various tutorials covering a wide range of computer science domains. Deep into them and get strong backgrounds for yourself."
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            cover={
              <img
                alt="Practice them"
                src="img/icon-home-2.svg"
              />
            }
            bordered={false}
          >
            <Card.Meta
              title="PRACTICE THEM"
              description="A large community that is willing to help you change your mind in programming world. More passed challenges more rewards. We are here to enjoy programming."
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            cover={
              <img
                alt="Be a champion"
                src="img/icon-home-3.svg"
              />
            }
            bordered={false}
          >
            <Card.Meta
              title="BE A CHAMPION"
              description="Weekly contests and various official bootcamp tour from well-known corporations. Participating in and proving your abilities with the employers."
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}