const fs = require('fs');
// const key = fs.readFileSync('./CA/localhost/localhost.decrypted.key');
const key = fs.readFileSync('cert/CA/localhost/localhost.decrypted.key');
// const cert = fs.readFileSync('./CA/localhost/localhost.crt');
const cert = fs.readFileSync('cert/CA/localhost/localhost.crt');

const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
    res.status(200).send('Hello world!');
});

const https = require('https');
const { Socket } = require('socket.io');
const server = https.createServer({ key, cert }, app);

const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user conneceted');
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is listening on https://localhost:${port}`);
});