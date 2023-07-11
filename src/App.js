import { useState, useRef } from "react";
import Cookies from "universal-cookie";
import Auth from "./Components/Auth.jsx";
import Chat from "./Components/Chat.jsx";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import "./App.css";

const cookies = new Cookies();
function App() {
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setRoom(null);
    setisAuth(false);
  };
  const [isAuth, setisAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomref = useRef(null);
  if (!isAuth) {
    return (
      <>
        <Auth setisAuth={setisAuth} />
      </>
    );
  }

  return (
    <>
      <div className="main">
        <hr />
        <h1 className="title">Converso</h1>
        <h2 className="title2">The Ultimate Chat App</h2>
        <hr />
        {room ? (
          <Chat room={room} />
        ) : (
          <div className="rooms">
            <label>Enter room name : </label>
            <input ref={roomref} className="inp" />
            <button
              onClick={() => {
                setRoom(roomref.current.value);
              }}
              className="roomrefs"
            >
              Enter
            </button>
          </div>
        )}
        <hr />
        <div className="Box">
          <button className="signout" onClick={signUserOut}>
            Sign out
          </button>
        </div>
        <hr />
      </div>
    </>
  );
}

export default App;
