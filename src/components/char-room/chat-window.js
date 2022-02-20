import { UserAddOutlined } from "@ant-design/icons";
// import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { Button, Tooltip, Avatar, Form, Input, Alert } from "antd";
import Message from "./message";
import { useEffect, useMemo, useState } from "react";
import useFireStore from "../../hooks/useFireStore";
import InviteMemberModal from "../modals/inviteMemberModal";
import { getAllDocument } from "../../firebase/services";
// import Message from './Message';
// import { AppContext } from '../../Context/AppProvider';
// import { addDocument } from '../../firebase/services';
// import { AuthContext } from '../../Context/AuthProvider';
// import useFirestore from '../../hooks/useFirestore';

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);
  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &__title {
      margin: 0;
      font-weight: bold;
    }
    &__description {
      font-size: 12px;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperStyled = styled.div`
  height: 100vh;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

export default function ChatWindow() {
  const [room, setRoom] = useState("");
  const [visible, setVisible] = useState(false);
  //   const { selectedRoom, members, setIsInviteMemberVisible } =
  //     useContext(AppContext);
  //   const {
  //     user: { uid, photoURL, displayName },
  //   } = useContext(AuthContext);
  //   const [inputValue, setInputValue] = useState('');
  //   const [form] = Form.useForm();
  //   const inputRef = useRef(null);
  //   const messageListRef = useRef(null);

  //   const handleInputChange = (e) => {
  //     setInputValue(e.target.value);
  //   };

  //   const handleOnSubmit = () => {
  //     addDocument('messages', {
  //       text: inputValue,
  //       uid,
  //       photoURL,
  //       roomId: selectedRoom.id,
  //       displayName,
  //     });

  //     form.resetFields(['message']);

  //     // focus to input again after submit
  //     if (inputRef?.current) {
  //       setTimeout(() => {
  //         inputRef.current.focus();
  //       });
  //     }
  //   };

  //   const condition = React.useMemo(
  //     () => ({
  //       fieldName: 'roomId',
  //       operator: '==',
  //       compareValue: selectedRoom.id,
  //     }),
  //     [selectedRoom.id]
  //   );

  //   const messages = useFirestore('messages', condition);

  //   useEffect(() => {
  //     // scroll to bottom after message changed
  //     if (messageListRef?.current) {
  //       messageListRef.current.scrollTop =
  //         messageListRef.current.scrollHeight + 50;
  //     }
  //   }, [messages]);
  const roomLocal = JSON.parse(localStorage.getItem("room"));
  useEffect(() => {
    if (room && room !== "") {
      setRoom(roomLocal);
    }
  }, [roomLocal]);
  const usersCondition = useMemo(() => {
    return {
      // lấy ra compareValue so sánh với đống array trong cột members
      fieldName: "uid",
      operator: "in",
      compareValue: ["Alex Nguyễn"],
    };
  }, []);
  const rooms = useFireStore({
    collection: "users",
    condition: usersCondition,
  });
  console.log(rooms);
  const handleModal = (data) => {
    setVisible(data);
  };
  useEffect(() => {
    const getUsers = async () => {
      try {
        const document = await getAllDocument("rooms");
        console.log(document);
      } catch (error) {}
    };
    getUsers();
  }, []);
  // console.log(collectionRef.docs.map((doc)=>({...doc.data()})))
  return (
    <WrapperStyled>
      {true ? (
        <>
          <HeaderStyled>
            <div className="header__info">
              <p className="header__title">
                {room && room?.rooms && room?.rooms !== "" ? room?.rooms : ""}
              </p>
              <span className="header__description">
                {room && room?.description && room?.description !== ""
                  ? room?.description
                  : ""}
              </span>
            </div>
            <ButtonGroupStyled>
              <Button
                icon={<UserAddOutlined />}
                type="text"
                onClick={() => setVisible(true)}
              >
                Mời
              </Button>
              <Avatar.Group size="small" maxCount={2}>
                {/* {members.map((member) => (
                  <Tooltip title={member.displayName} key={member.id}>
                    <Avatar src={member.photoURL}>
                      {member.photoURL
                        ? ''
                        : member.displayName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))} */}
                {rooms &&
                  rooms.length > 0 &&
                  rooms.map((v, index) => {
                    return (
                      <Tooltip key={index} title={v?.displayName || ""}>
                        <Avatar src={v?.photoURL}>
                          {v?.photoURL && v?.photoURL !== ""
                            ? ""
                            : v?.displayName.charAt(0).toUpperCase()}
                        </Avatar>
                      </Tooltip>
                    );
                  })}
              </Avatar.Group>
            </ButtonGroupStyled>
          </HeaderStyled>
          <ContentStyled>
            <MessageListStyled>
              {/* {messages.map((mes) => (
                <Message
                  key={mes.id}
                  text={mes.text}
                  photoURL={mes.photoURL}
                  displayName={mes.displayName}
                  createdAt={mes.createdAt}
                />
              ))} */}
              <Message
                key="123"
                text="123"
                photoURL=""
                displayName="456"
                createdAt="2021"
              />
            </MessageListStyled>
            <FormStyled>
              <Form.Item name="message">
                <Input
                  //   ref={inputRef}
                  //   onChange={handleInputChange}
                  //   onPressEnter={handleOnSubmit}
                  placeholder="Nhập tin nhắn..."
                  bordered={false}
                  autoComplete="off"
                />
              </Form.Item>
              <Button type="primary">Gửi</Button>
            </FormStyled>
          </ContentStyled>
        </>
      ) : (
        <Alert
          message="Hãy chọn phòng"
          type="info"
          showIcon
          style={{ margin: 5 }}
          closable
        />
      )}
      <InviteMemberModal handleModal={handleModal} visible={visible} />
    </WrapperStyled>
  );
}
