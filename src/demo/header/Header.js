import React from "react";
import { Layout, Avatar } from "antd";
import "./Header.scss";

const { Header: AntHeader } = Layout;

export default function Header() {
  return (
    <AntHeader style={{ background: "#F0F2F5" }}>
      <div className="logo-container">
        <Avatar
          src="/img/logo.png"
          alt="logo"
          className="logo"
          shape="square"
          size="large"
        />
      </div>
      <div className="name">Zalo OA &amp; Platform</div>

      {/* <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Others</Menu.Item>
      </Menu> */}
    </AntHeader>
  );
}
