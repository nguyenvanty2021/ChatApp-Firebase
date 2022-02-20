import React, { useEffect, useMemo, useState } from "react";
import { Collapse, Typography, Button } from "antd";
import styled from "styled-components";
import {
  AppleFilled,
  CloseOutlined,
  EditOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import useFireStore from "../../hooks/useFireStore";
import AddRoomModal from "../modals/addRoomModal";
import firebase from "firebase/app";
import { deleteDocument, updateDocument } from "../../firebase/services";
const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }
    .ant-collapse-content-box {
      padding: 0 40px;
    }
    .add-room {
      color: white;
      padding: 0;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

export default function RoomList() {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState("");
  // các thuộc tính của bảng room-list
  // {
  //   name: "room name",
  //   description: "des",
  //   members: [uid1, uid2],
  // }
  const handleAddRoom = () => {
    setVisible(true);
    // setIsAddRoomVisible(true);
  };
  const roomsCondition = useMemo(() => {
    return {
      // lấy ra compareValue so sánh với đống array trong cột members
      fieldName: "members",
      operator: "array-contains",
      compareValue: user?.uid || "",
    };
  }, [user?.uid]);
  const rooms = useFireStore({
    collection: "rooms",
    condition: roomsCondition,
  });
  // từ dòng 42 đến dòng 53 phải tách ra bỏ trong useEffect và để trong 1 file riêng bỏ vào file App.js rồi dispatch 1 action lưu data rooms sau khi filter vào reducers
  // vì data realtime nó luôn được gọi lại mỗi khi trên db có sự thay đổi data nên chỉ cần tạo 1 component riêng dispatch lưu data vào reducer
  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem("user"));
    setUser(userLocal);
  }, []);
  console.log(rooms);
  const handleModal = (data) => {
    setVisible(data);
  };
  const handleRemove = async (id) => {
    try {
      await deleteDocument(id, "rooms");
    } catch (error) {}
  };
  const handleUpdate = async (id, room) => {
    try {
      await updateDocument(id, "rooms", {...room, rooms: `${room?.rooms} 1`});
    } catch (error) {
      
    }
  }
  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <PanelStyled header="Danh sách các phòng" key="1">
        {rooms &&
          rooms.length > 0 &&
          rooms.map((room) => (
            <div style={{ display: "flex" }}>
              <LinkStyled
                onClick={() =>
                  localStorage.setItem("room", JSON.stringify(room))
                }
                key={room.id}
              >
                {room.rooms}
              </LinkStyled>
              <CloseOutlined
                onClick={() => handleRemove(room?.id || 0)}
                style={{ color: "white" }}
              />
              <EditOutlined   style={{ color: "white" }} onClick={() => handleUpdate(room?.id || 0, room)} />
            </div>
          ))}
        <Button
          type="text"
          icon={<PlusSquareOutlined />}
          className="add-room"
          onClick={handleAddRoom}
        >
          Thêm phòng
        </Button>
      </PanelStyled>
      <AddRoomModal user={user} handleModal={handleModal} visible={visible} />
    </Collapse>
  );
}
