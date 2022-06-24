const express = require('express')
const {Server} = require('ws')
const app = express()
app.use(express.static('./orpho-react/build'))
const http = require('http')
const server = http.createServer(app)
const wsServer = new Server({server})
let sockets = new Set()
wsServer.on('connection', (socket) =>
{
    sockets.add(socket)
    socket.on('message', (msg) =>
    {   
        const message = msg.toString()
        if (message == 'ping')
        {
            socket.send('pong')
            return
        }
        sockets.forEach(skt =>
            {
                skt.send(message)
            })
    })
})
server.listen(process.env.PORT || 5000)