require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL
const PORT = process.env.PORT || 3000
const routes = require('./routes/routes');

mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Mongo database connected')
})

const app = express();

app.use(express.json());
app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`)
})

