const bot = require('shadow-utils')
const client = new bot.Client({
    token: "im done lol",
    prefix: "!!",
    debug: true,
    time: 60000 // 1m
})
client.login()
client.on('message', (message) => {
    if(message.content === '!!neon') {
        message.channel.send('NOPE ' + 
        client.client.user.username)
    }
})