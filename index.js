const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());


app.use(express.json());


app.use(express.urlencoded({ extended: true }));

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
