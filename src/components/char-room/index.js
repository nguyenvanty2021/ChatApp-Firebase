import React from 'react';
import { Row, Col } from 'antd';
import ChatWindow from './chat-window';
import Sidebar from './sidebar';

export default function ChatRoom() {
  return (
    <div>
      <Row>
        <Col span={6}>
          <Sidebar />
        </Col>
        <Col span={18}>
          <ChatWindow />
        </Col>
      </Row>
    </div>
  );
}