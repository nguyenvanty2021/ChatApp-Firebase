import React from 'react';
import { Avatar, Typography } from 'antd';
import styled from 'styled-components';

const WrapperStyled = styled.div`
  margin-bottom: 10px;
  .author {
    margin-left: 5px;
    font-weight: bold;
  }
  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }
  .content {
    margin-left: 30px;
  }
`;
export default function Message({ text, displayName, createdAt, photoURL }) {
  return (
    <WrapperStyled>
      <div>
        <Avatar size='small' src={photoURL}>
            123
          {/* {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()} */}
        </Avatar>
        <Typography.Text className='author'>123</Typography.Text>
        <Typography.Text className='date'>
         123
        </Typography.Text>
      </div>
      <div>
        <Typography.Text className='content'>123</Typography.Text>
      </div>
    </WrapperStyled>
  );
}