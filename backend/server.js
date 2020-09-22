//Connect with Express, Cors and Mongoose
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require("http");
const socketio = require('socket.io');
//Connect with dotenv to have variables in the file .env
require('dotenv').config();



const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Connect with MongoDB Atlas DB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//Use the routes files
//Load the files
const usersRouter = require('./routes/users');
//Add as Middleware
app.use('/users', usersRouter);


// SOCKET.IO
const server =http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  console.log("User connected!");

  socket.on('move', ({ userId })  => {
    console.log(userId);
    io.emit('move', userId);
  })

  socket.on('disconnect', () => {
    console.log("User disconnected!");
  });
});


//Start the server
server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
