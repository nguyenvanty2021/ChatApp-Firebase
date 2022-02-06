import React, { useEffect, useMemo, useState } from "react";
import { Collapse, Typography, Button } from "antd";
import styled from "styled-components";
import { AppleFilled, PlusSquareOutlined } from "@ant-design/icons";
import useFireStore from "../../hooks/useFireStore";

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
  const [user, setUser] = useState("");
  // các thuộc tính của bảng room-list
  // {
  //   name: "room name",
  //   description: "des",
  //   members: [uid1, uid2],
  // }
  const handleAddRoom = () => {
    // setIsAddRoomVisible(true);
  };
  const roomsCondition = useMemo(() => {
    return {
      // lấy ra compareValue so sánh với đống array trong cột members
      fieldName: "members",
      operator: "array-contains",
      compareValue: user?.displayName || "",
    };
  }, [user?.displayName]);
  const rooms = useFireStore({
    collection: "rooms",
    condition: roomsCondition,
  });
  // từ dòng 42 đến dòng 50 phải tách ra 1 file riêng bỏ vào file App.js rồi dispatch 1 action lưu data rooms vào reducers
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);
  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <PanelStyled header="Danh sách các phòng" key="1">
        {rooms &&
          rooms.length > 0 &&
          rooms.map((room) => (
            <LinkStyled key={room.id}>{room.rooms}</LinkStyled>
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
    </Collapse>
  );
}
