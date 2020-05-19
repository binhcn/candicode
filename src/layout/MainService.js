import React from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import Content from './content/Content';
import { Layout } from 'antd';

export default function MainService(props) {
  return (
    <div>
      <Layout>
        <Header />
        <Content>
          {props.children}
        </Content>
        <Footer />
      </Layout>
    </div>
  );
}