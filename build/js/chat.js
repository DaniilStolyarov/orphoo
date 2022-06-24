const socket = new WebSocket(location.origin.replace(/^http/, 'ws'))
socket.onmessage = (msg) =>
{
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
    socket.send(field.value)
    field.value = ''
}