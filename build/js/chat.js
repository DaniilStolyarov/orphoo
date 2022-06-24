var socket = new WebSocket(location.origin.replace(/^http/, 'ws'))
socket.onmessage = (msg) =>
{
    if (msg.data == 'pong')
    {
        console.log(msg.data)
        return
    }
    const author = document.createElement('div')
    author.className = 'author'
    const data = document.createElement('div')
    data.className = 'data'
    const message = document.createElement('div')
    message.className = 'message'
    data.textContent = msg.data
    author.textContent = 'Анонимус'
    message.append(author)
    message.append(data)
    document.querySelector('.view').prepend(message)
}
setInterval(() => {
    socket.send('ping')
}, 10000);
[...document.getElementsByClassName('send')].forEach(send => 
    {
        const btn = send.querySelector('.msg-submit')
        const field = send.querySelector('.msg-field')
        btn.addEventListener('click', (ev) => submit(btn))
        field.addEventListener('keydown', (ev) => 
        {
            if (ev.key == 'Enter')
            {
                submit(btn)
            }
        })
    }
    )
function submit(target)
{
    const send = target.closest('.send')
    const field = send.querySelector('.msg-field')

    if (socket.readyState == socket.CLOSED)
    {
        console.log('reopening')
        socket.close()
        socket = new WebSocket(location.origin.replace(/^http/, 'ws'))
    }
    function Send()
    {
        socket.send(field.value)
    }
    try
    {
        Send()
    }
    catch(err)
    {
        setTimeout(Send, 5000)
    }
    field.value = ''
}