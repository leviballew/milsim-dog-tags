require('dotenv').config();

if (!process.env.NODE_ENV) {
  console.error('Missing NODE_ENV');
  process.exit(1); // Exit the process with an error code
}

const express = require('express');
const app = express();
const port = 8080;

const userRoutes = require('./routes/users');


const cors = require('cors')

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);

app.listen(port, (req, res) => {
  console.log(`Your server is up at http://localhost:${port}/`)
})

