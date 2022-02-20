import { Button } from "antd";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import firebase, { auth, db, storage } from "../../firebase/config";
import { addDocument, generateKeywords } from "../../firebase/services";
const fbProvider = new firebase.auth.FacebookAuthProvider();
// firebase không ai dùng .get để getAll hết mà dùng onSnap để getAll để data realtime
const Login = () => {
  const history = useHistory();
  const handleLoginFacebook = async () => {
    const data = await auth.signInWithPopup(fbProvider);
    // login = fb thành công, data sẽ là thông tin fb gồm: username, avatar, ...
    if (data?.additionalUserInfo && data?.additionalUserInfo?.isNewUser) {
      addDocument("users", {
        displayName: data?.user?.displayName || "",
        email: data?.user.email || "",
        uid: data?.user?.displayName || "",
        photoURL: data?.user.photoURL || "",
        providerId: data?.additionalUserInfo?.providerId,
        keywords: generateKeywords(data?.user?.displayName.toLowerCase()),
      });
    }
  };
  // sau khi login fb or email thông qua firebase thành công, firebase sẽ cung cấp hàm này để chúng ta
  // biết là đã login thành công hay chưa -> khi login thành công hàm này mới được gọi và thực thi
  auth.onAuthStateChanged((user) => {
    console.log(user);
    // thì khi login thành công thì mới có obj user
    if (user) {
      // đã đăng nhập
      localStorage.setItem(
        "user",
        JSON.stringify({
          displayName: user?.displayName,
          uid: user?.displayName,
          email: user.email,
          photoURL: user.photoURL,
          keywords: generateKeywords(user.displayName?.toLowerCase()),
        })
      );
      history.push("/chat-room");
    } else {
      // chưa đăng nhập
    }
  });
  // hoặc
  // hàm này cũng có công dụng tương tự như: onAuthStateChanged -> dùng để check xem user đã login hay chưa thông qua biến user
  const user = firebase.auth().currentUser;
  console.log(user);
  if (user) {
    // đã đăng nhập
  } else {
    // chưa đăng nhập
  }

  const handleRegisterEmail = useCallback(async () => {
    try {
      const res = await auth.createUserWithEmailAndPassword(
        "anhhung_so11@gmail.com",
        "08387623221qweQWE"
      );
      console.log(res);
    } catch (error) {}
  }, []);
  const handleLoginEmail = useCallback(async () => {
    try {
      const res = await auth.signInWithEmailAndPassword(
        "anhhung_so11@gmail.com",
        "08387623221qweQWE"
      );
      console.log(res);
    } catch (error) {}
  }, []);
  const handleForgetEmail = useCallback(async () => {
    try {
      await auth.sendPasswordResetEmail("anhhung_so11@yahoo.com");
      console.log("Vao mail check nha");
    } catch (error) {}
  }, []);
  const handleLoginGoogle = useCallback(async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const res = await firebase.auth().signInWithPopup(provider);
      console.log(res);
    } catch (error) {}
  }, []);
  const [objImage, setObjImage] = useState("");
  const handleSaveImage = async () => {
    const imageRef = await storage
      .ref()
      .child("anhhung_so11@yahoo.com")
      .child(objImage?.name || "");
    // const imageRef = await storage.ref().child("anhhung_so11@yahoo.com");
    // bỏ obj image vào nha -> ở đay lười mình bỏ link url ảnh thử
    await imageRef.put(objImage);
    const imageUrl = await imageRef.getDownloadURL();
    console.log(imageUrl);
    // bỏ link url này vào api add or update lại image
  };
  return (
    <div>
      <input type="file" onChange={(e) => setObjImage(e.target.files[0])} />
      <Button onClick={() => handleSaveImage()}>
        Save Image Into Storage Firebase
      </Button>
      <Button onClick={() => handleLoginGoogle()}>Login Google</Button>
      <Button onClick={() => handleForgetEmail()}>Forget Email</Button>
      <Button onClick={() => handleLoginEmail()}>Login Email</Button>
      <Button onClick={() => handleRegisterEmail()}>Register Email</Button>
      <Button onClick={handleLoginFacebook}>Login Facebook</Button>
    </div>
  );
};
export default Login;
