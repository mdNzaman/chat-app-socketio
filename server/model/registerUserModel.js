const dbCon = require("../config/db");
// const {registerUser} = require("../model")

exports.registerUserController = async (req, res) => {
  try {
    // async (req,res)=>{
    const body = req.body;
    const user_name = body.user_name;
    const room_id = body.room_id;
    const response = await registerUser(user_name, room_id);

    res.status(200).json({
      success: 1,
      user_name: user_name,
      room_id: room_id,
    });
  } catch (err) {
    console.log(err);
  }
  // }
};

registerUser = (userName, roomId) => {
  return new Promise((resolve, reject) => {
    dbCon.query(
      `INSERT INTO join_room (user_name,room)
        VALUES (?,?)`,
      [userName, roomId],
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
};
