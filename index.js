const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const port = process.env.PORT || 5000;

app.get('/', (req, res)=>{
    res.send('Welcome to Hotel Booking Server');
});

app.listen(port, ()=>{
    console.log('Running on the port', port);
});