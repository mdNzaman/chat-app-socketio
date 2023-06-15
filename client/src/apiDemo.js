const getChatMsg = (chatID, recId, userName, isOnline, profile_pic) => {
    var profileImg = flag;
    if (
      profile_pic != undefined &&
      profile_pic != " " &&
      profile_pic.length > 0
    ) {
      profileImg = profile_pic;
    }
    // console.log(profileImg,"profile_pic");
    if (chatIndex === 0) {
      setIsOnline(isOnline ? "Online" : "Offline");
      setUser(userName);
      setProfile_pic(profileImg);
      setReciever(recId);
      setChat_id(chatID);
      setMsgData([]);
    }

    socket.on("connect", (data) => {
      // console.log("chat connected", chatID);

      socket.emit("join", { chat_id: chatID });
      console.log(chatID, "test");

      socket.on("receive_message", (data) => {
        console.log(
          "recieved data: ",
          data.message,
          data.receiver_id,
          data.sender_id,
          data.messaged_at
        );
        if (data.sender_id != User_Id) {
          setMsgData((oldArray) => [...oldArray, data]);
        }
        return () => {
          socket.disconnect();
        };
      });
    });

    socket.on("connect_error", (err) => {
      // console.log(err)
    }); // This worked for me

    fetch(API_URL + "get-user-chat-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth_token: auth_token,
      },
      body: JSON.stringify({
        chat_id: chatID,
        last_msg_id: chatIndex,
      }),
    }).then((data) =>
      data.json().then((data) => {
        if (data.status === 1) {
          data.data.length > 0 &&
            (chatIndex === 0
              ? setMsgData(data.data)
              : setMsgData([...data.data, ...msgData]));
        }
      })
    );
  };