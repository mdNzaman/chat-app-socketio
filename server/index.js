const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const {
  registerUser,
  registerUserController,
} = require("./model/registerUserModel");

app.use(express.json()); // due to this i was not getting my body-content
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
// function data(a){
//     a = 10;
//     return a;
// json({success:1,
//     message:"api working"})
// }

app.get("/", async (req, res) => {
  console.log("apis working");
  // let a;
  // const dat = await data(a);
  res.status(200).json({
    // data: dat
    // success:1,
    // message:"api working"
  });
});

app.post(
  "/register-user",
  registerUserController
  // async (req,res)=>{
  //     console.log("bug..");
  //     console.log(req.user_name);
  //     console.log(req.body);
  //     const body = req.body;
  //     console.log(body);
  //     const user_name = body.user_name;
  //     const room_id = body.room_id;
  //     const response =  await registerUser(user_name,room_id);
  //     res.status(200).json({
  //         success:1,
  //         message:"api working"
  //     })
  // }
);

io.on("connection", (socket) => {
  // socket.removeAllListeners();

  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    // data-->id
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined Room: ${data}`);
  });

  socket.on("send_message", (data) => {
    // data-->messageData
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("server listen to port no: 3001");
});
