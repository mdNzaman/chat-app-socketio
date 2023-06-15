import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
// import "./App.css";

export default function Chat({ socket, name, room }) {
  // {console.log(socket,name,room)}
  let myStyle = {
    backgroundColor: "#43a047",
  };

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  // const [renderChat, setRenderChat] = useState(false);

  const sendMessgae = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: name,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) =>
        // console.log(list)
        [...list, messageData]
      );
      setCurrentMessage("");
      // {console.log("1"+setMessageList);}
      // setRenderChat(true);
    }
  };

  useEffect(() => {
    console.log("check");
    const receiveMessage = (data) => {
      console.log("data ", data);
      setMessageList((list) => [...list, data]);
    };

    socket.on("receive_message", receiveMessage);

    return () => {
      socket.off("receive_message", receiveMessage);
    };
  }, []);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      {/* {renderChat ? ( */}

      <div className="chat-body">
        {/* <div > */}

        {console.log(messageList)}
        {console.log("bug")}

        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, index) => {
            // return <h1>{messageContent.message}</h1>
            return (
              <div
                className="message"
                key={index}
                id={name === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    {/* {console.log(messageContent.author)}
                            {console.log(messageContent.time)} */}

                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>

      {/* ):( */}

      <div className="chat-footer">
        {/* <div>
        </div> */}
        {/* <div> */}
        <input
          type="text"
          value={currentMessage}
          placeholder="Chat comes here..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessgae();
          }}
        />
        {/* <div> */}
        <button onClick={sendMessgae} style={myStyle}>
          &#9658;
        </button>
        {/* </div>
        </div> */}
      </div>
      {/* )} */}
    </div>
  );
}
