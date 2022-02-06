import React, { useEffect, useState } from "react";
import { Button, Avatar, Typography } from "antd";
import styled from "styled-components";
import { auth, db } from "../../firebase/config";
import { useHistory } from "react-router";

const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);
  .username {
    color: white;
    margin-left: 5px;
  }
`;

export default function UserInfo() {
  const history = useHistory();
  const [user, setUser] = useState("");
  useEffect(() => {
   // hàm này bắt sự kiện realtime -> khi có 1 data mới được thêm vào hàm này sẽ mặc định được gọi lại
    db.collection("users").onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
     // console.log(data)
    });
  }, []);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);
  return (
    <WrapperStyled>
      <div>
        <Avatar src={user?.photoURL || ""}>
          {user?.displayName && user?.displayName === ""
            ? ""
            : user?.displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className="username">
          {" "}
          {user?.displayName && user?.displayName === ""
            ? ""
            : user?.displayName?.toUpperCase()}
        </Typography.Text>
      </div>
      <Button
        ghost
        onClick={() => {
          // clear state in App Provider when logout
          localStorage.removeItem("user");
          auth.signOut();
          history.push("/");
        }}
      >
        Đăng xuất
      </Button>
    </WrapperStyled>
  );
}
