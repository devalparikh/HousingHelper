// server.js
// Running backend on port 5000
// 
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// cors middleware 
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('hello'));

app.listen(port, () => {
    // console log the server port
    console.log(`Server is running on port: ${port}`);
});