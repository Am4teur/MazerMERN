//Connect with Express, Cors and Mongoose
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require("http");
const socketio = require('socket.io');
//Connect with dotenv to have variables in the file .env
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

//Connect with MongoDB Atlas DB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//Use the routes files
//Load the files
const usersRouter = require('./routes/users');
//Add as Middleware
app.use('/users', usersRouter);

const mazesRouter = require('./routes/mazes');
app.use('/mazes', mazesRouter);


// SOCKET.IO
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  console.log("User connected to socket id: " + socket.id);

  socket.on('join', ({ userId, mazeId }) => {
    console.log("User: " + userId + " has joined maze: " + mazeId + "!");
    console.log(socket.rooms);
  });

  socket.on('move', ({ userId, mazeId })  => {
    console.log("User: " + userId + " moved on maze: " + mazeId + "!");
    io.emit('move', userId);
  });

  socket.on('disconnect', () => {
    console.log("User disconnected!");
    console.log(socket.rooms);
  });
});


//Start the server
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
