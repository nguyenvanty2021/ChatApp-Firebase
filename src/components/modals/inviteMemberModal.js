import React, { useState } from "react";
import { Form, Modal, Select, Spin, Avatar } from "antd";
import { db } from "../../firebase/config";

async function fetchUserList(search, curMembers) {
  return db
    .collection("users")
    .where("keywords", "array-contains", search?.toLowerCase())
    .orderBy("displayName")
    .limit(20)
    .get()
    .then((snapshot) => {
      return snapshot.docs
        .map((doc) => ({
          label: doc.data().displayName,
          value: doc.data().uid,
          photoURL: doc.data().photoURL,
        }))
        .filter((opt) => !curMembers.includes(opt.value));
    });
}

export default function InviteMemberModal({ visible, handleModal }) {
  const { Option } = Select;
  //   const {
  //     isInviteMemberVisible,
  //     setIsInviteMemberVisible,
  //     selectedRoomId,
  //     selectedRoom,
  //   } = useContext(AppContext);

  //   const handleOk = () => {
  //     // reset form value
  //     form.resetFields();
  //     setValue([]);

  //     // update members in current room
  //   //  const roomRef = db.collection("rooms").doc(selectedRoomId);

  //     // roomRef.update({
  //     //   members: [...selectedRoom.members, ...value.map((val) => val.value)],
  //     // });

  //  //   setIsInviteMemberVisible(false);
  //   };

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return (
    <div>
      <Modal
        title="Mời thêm thành viên"
        visible={visible}
        footer={null}
        //    onOk={handleOk}
        onCancel={() => handleModal(false)}
        destroyOnClose={true}
      >
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Select one member"
          defaultValue={["china"]}
          onChange={handleChange} 
          optionLabelProp="label"
        >
          <Option value="china" label="China">
            <div className="demo-option-label-item">
              <span role="img" aria-label="China">
                🇨🇳
              </span>
              China (中国)
            </div>
          </Option>
        </Select>
      </Modal>
    </div>
  );
}
