import { Button } from "antd";
import { useHistory } from "react-router-dom";
import firebase, { auth, db } from "../../firebase/config";
import { addDocument } from "../../firebase/services";
const fbProvider = new firebase.auth.FacebookAuthProvider();
const Login = () => {
  const history = useHistory();
  const handleLoginFacebook = async () => {
    const data = await auth.signInWithPopup(fbProvider);
    console.log(data);
    if (data?.additionalUserInfo && data?.additionalUserInfo?.isNewUser) {
      addDocument("users", {
        displayName: data?.user?.displayName || "",
        email: data?.user.email || "",
        uid: data?.user?.displayName || "",
        photoURL: data?.user.photoURL || "",
        providerId: data?.additionalUserInfo?.providerId,
      });
    }
  };
  auth.onAuthStateChanged((user) => {
    if (user) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          displayName: user?.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
      );
      history.push("/chat-room");
    }
  });
  return (
    <div>
      <Button>Login Google</Button>
      <Button onClick={handleLoginFacebook}>Login Facebook</Button>
    </div>
  );
};
export default Login;
