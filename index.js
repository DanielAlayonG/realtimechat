const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser')
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use('/api', require('./routes'))

app.use('/', (req,res) => {
  res.send("hola  mundo")
})

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
