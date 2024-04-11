const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser')
const http = require('http');



dotenv.config();

const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const PORT = process.env.PORT || 3000;

app.use(cors());


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use('/api', require('./routes'))


let uri = "mongodb+srv://chatapp:Z2iVgbzPvb4JVp1z@cluster0.po7adqj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, {
  retryWrites: true,
  w: 'majority'
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));

db.once('open', () => {
  console.log('Conexión exitosa a la base de datos MongoDB.');
});


const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}


io.on('connection', (socket) => {  
  socket.on('message', (data) => {
    const { message, user, type} = data;
    const timestamp = formatDate(new Date()); // Formatea el timestamp
    io.emit('message', { message, user, timestamp, type }); // Envía el mensaje junto con el timestamp
  });

  socket.on('disconnect', () => {
    console.log('user disconnected')
  });
});


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
