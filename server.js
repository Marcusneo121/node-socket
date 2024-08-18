require("dotenv").config();

const express = require("express");
const app = express();

// Access environment variables
const PORT = process.env.PORT || 3000;

//serve the file in public statically
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const expressServer = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const socketio = require("socket.io");
//io is our socket io server!
const io = socketio(expressServer, {});

// on is a regular javascript/node event listener
// emit is the another BIG method
io.on("connect", (socket) => {
  console.log("New user connected : ", socket.id, "has joined our server!");
  // first arg or emit is the event name
  socket.emit("welcome", [1, 2, 3]);
  socket.on("thankYou", (data) => {
    console.log("Got message : ", socket.id, data);
  });
});
