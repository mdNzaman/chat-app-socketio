import React, { useEffect, useState } from 'react'
// import "./App.css";

export default function Chat({socket, name, room}){

    // {console.log(socket,name,room)}
    let myStyle = {
        backgroundColor:'#43a047'
      }

const [currentMessage,setCurrentMessage] = useState("");
const [messageList,setMessageList] = useState([]);

const sendMessgae = async ()=>{
    if(currentMessage!==""){
        const messageData = {
            room: room,
            author: name,
            message: currentMessage,
            time: new Date(Date.now()).getHours()+
             ":" + new Date(Date.now()).getMinutes(),
        };

        await socket.emit("send_message",messageData);
        setMessageList((list)=>
            // console.log(list)
            [...list, messageData])
        setCurrentMessage("");
// {console.log("1"+setMessageList);}
    }
};

useEffect(()=>{
    socket.on("receive_message",(data)=>{
        // data = "";
       
        console.log(data);
        setMessageList((list)=>
            [...list,data]
        );
        // {console.log("2"+setMessageList);}
    });
}, [socket]);

  return (
    <div className='chat-window'>
        <div className='chat-header'>
            <p>Live Chat</p>
        </div>

        <div className='chat-body'>

            {console.log(messageList)}  

            {messageList.map((messageContent)=>{
                // return <h1>{messageContent.message}</h1>
                return (
                <div className='message' id={name === messageContent.author ? "you" : "other"}>
                    <div>
                        <div className='message-content'>
                            <p>{messageContent.message}</p>
                        </div>
                        <div className='message-meta'>
                            <p id="time">{messageContent.time}</p>
                            {/* {console.log(messageContent.author)}
                            {console.log(messageContent.time)} */}
                            <p id="author">{messageContent.author}</p>
                        </div>
                    </div>
                </div>
                )
            })}
        </div>

        <div className='chat-footer'>
        <input type="text" value={currentMessage} placeholder="Chat comes here..." onChange={(event)=>{
            setCurrentMessage(event.target.value);
        }} onKeyPress={(event)=>{
            event.key ==="Enter" && sendMessgae();
        }}/>
        <button onClick={sendMessgae} style={myStyle}>&#9658;</button>
        </div>
        
    </div>
  )
}
