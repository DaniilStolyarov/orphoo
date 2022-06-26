function onMessage(data, socket, {sockets, users}) 
{
    let stringData, message
    stringData = data.toString('utf8')
    
    try 
    {
        message = JSON.parse(data)
    }
    catch (err)
    {
        socket.send('pong')
        return
    }
    for (let key in handlers)
    {
        handlers[key](message, {socket, sockets, users})
    }
}
module.exports.onMessage = onMessage
const handlers = 
{
    chatMessage({content, key}, {users, sockets})
    {
        if (!(key in users)) return
        const nickname = users[key]
        for (let skt of sockets)
        {
            skt.send(
                JSON.stringify({author : nickname, content, createDate : Date.now()}))
        }
    }
}