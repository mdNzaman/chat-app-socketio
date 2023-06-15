// import logo from './logo.svg';
import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import Chat from './chat'

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  useEffect(() => {
    console.log("check");
    socket.on("receive_message", (data) => {
      // data = "";

      console.log("data ", data);
      // setMessageList((list) => [...list, data]);
      // {console.log("2"+setMessageList);}
    });
  }, []);

  const joinRoom = async () => {
    if (username !== "" && room !== "") {

      // getChatList(username,room);

      const response = await fetch("http://localhost:3001/" + "register-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name:username,
          room_id:room
        }),
        // body: JSON.stringify(credentials),
      }).then((data) => data.json());

      console.log(response);
      // console.log(data);

      socket.emit("join_room", room);

      setShowChat(true);
    }else{
      console.log("something missing");
    }
  };

  return (
 
    <div className="App">
      {!showChat ? (

      <div className="joinChatContainer">
      <h3>Join A Chat</h3>
      <input
        type="text"
        placeholder="Name.."
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Room ID.."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}>Join A Room</button>
      </div>
      ):(
      <Chat socket={socket} name={username} room={room}/>
      )}
    </div>
  
  );
}

export default App;
