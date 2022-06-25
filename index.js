const express = require('express')
const {Server} = require('ws')
const app = express()
app.use(process.env.PORT ? express.static('./build') : express.static('./orpho-react/build'))
const http = require('http')
const server = http.createServer(app)
const wsServer = new Server({server})
const Message = require('./Message')
const bodyParser = require('body-parser')
let sockets = new Set()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
wsServer.on('connection', (socket) =>
{
    sockets.add(socket)
    socket.on('message', (msg) =>
    {   

    })
})
app.post('/register', urlencodedParser, (req, res) =>
{
    console.log(req.body.toString())
})
server.listen(process.env.PORT || 5000)