import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const useFireStore = (props) => {
  const { collection, condition } = props;
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    // lấy ra hết all data của bảng nào với data được sắp xếp theo ngày
    // let collectionRef = db.collection(collection).orderBy("createdAt");
    let collectionRef = db.collection(collection);
    if (condition) {
      // condition:
      // {
      //     fieldName: ["abc", "def"],
      //     operator: "==" or ">" or "<" or "array-contains" or "in" -> dùng in khi muốn xem giá trị abc có nằm trong 1 array không -> in là trong
      //     compareValue: "abc",
      // }
      // collectionRef.where("name", "==", "Tung");
      if (condition?.compareValue && condition?.compareValue !== "") {
          // lấy ra những obj nào trong array rooms có thành viên là: Alex Nguyễn nằm trong thuộc tính members
        collectionRef = collectionRef.where(
          condition?.fieldName,
          condition?.operator,
          condition?.compareValue
        );
      }
    }
    // hàm này bắt sự kiện realtime -> khi có 1 data mới được thêm vào hàm này sẽ mặc định được gọi lại
    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const document = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocuments(document);
    });
    // khi component bị unmount thì nó sẽ huỷ bỏ sự lắng nghe data cập nhật realtime trên component này
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection, condition]);
  return documents;
};
export default useFireStore;
