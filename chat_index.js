const fs = require('fs');
// const cert = fs.readFileSync('../cert/CA/localhost/localhost.crt');
const cert = fs.readFileSync('cert/CA/localhost/localhost.crt');
const key = fs.readFileSync('cert/CA/localhost/localhost.decrypted.key');
// const key = fs.readFileSync('');

const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

// app.get('/', (req, res, next) => {
//     res.status(200).send('Hello world!');
// });

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

const https = require('https');
const server = https.createServer({ key, cert }, app);
const io = require('socket.io')(server);


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', msg => {
        io.emit('chat message', msg);
        console.log('a user disconnected');
    });    
});

// const port = 3000;
server.listen(port, () => {
    console.log(`Server is listening on https://localhost:${port}`);
});