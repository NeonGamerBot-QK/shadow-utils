const dops = require(__dirname + '/ops.json')
var colors = require('colors')
const ee = require("events").EventEmitter;
class Client extends ee {
    constructor (ops = dops) {
super()
this.token = ops.token
this.prefix = ops.prefix
this.debug = ops.debug
this.time = ops.time || null
}
login() {
    if(!this.debug) {
        const Discord = require('discord.js')
        const client = new Discord.Client()
        this.client = client
        client.on('message', async (message) => {
          this.emit('message', message)
            if(message.author.bot) return;
           if(!message.content.startsWith(this.prefix)) return;
            const cmd = message.content.toString().toLocaleLowerCase()
            if(cmd ===  this.prefix + 'ping') {
                message.channel.send(`Pong!  ${client.ws.ping} Latency, ${Date.now() - message.createdTimestamp}`).catch(e => {}).then(message.delete())
            } 
        })
    client.on('ready', () => {
            try {
                console.log(`Ready on ${client.user.tag}!`)
            } catch (err) {
                e = {}
            }            
        
    })
    client.login(this.token).catch(e => new TypeError('Invalid token'))
    } else {
        const Discord = require('discord.js')
        const client = new Discord.Client()
        this.client = client
        client.on('message', async (message) => {
            this.emit('message', message, client)
            console.log('[DEBUG]'.grey + ' emited'.bold + ' message event!')
            if(message.author.bot) return;
          console.log('[DEBUG]'.grey + ' running message event ' + '['.grey + message.content.grey + ']'.grey)
           if(!message.content.startsWith(this.prefix)) return;
            const cmd = message.content.toString().toLocaleLowerCase()
            if(cmd === this.prefix + 'ping') {
              console.log('[DEBUG]'.grey + ' running ' + this.prefix + 'ping command')
                try{ 
                    message.channel.send(`
                    Pong! ${client.ws.ping} \n Latency ${Date.now() - message.createdTimestamp}
                `).catch(e => console.error('[DEBUG]'.grey + ' ' + e))
                } catch (e) {
console.error('[DEBUG]'.grey.bgRed + ' ' + e)
                } finally {
                    console.log('[DEBUG]'.gray + ' ' + message.author.username + ` ran ${this.prefix}ping`)
                }
            } 
        })
        client.on('ready', () => {
            console.log('[DEBUG]'.grey + ' trying ready event')    
            try {
                    console.log(`Ready on ${client.user.tag}!`)
                } catch (err) {
                    console.error('[DEBUG],'.yellow + '[ERROR] '.red + err)
                } finally {
                    console.log('[DEBUG]'.grey + ' Client is running, debug passed')
                }
            console.log('[DEGUG]'.gray + ' checking for timelimit..') 
            if(!this.time) { console.log('[DEGUG]'.gray + ' none found')  }
            else {
                if(typeof this.time !== 'number') return console.error('[DEBUG]'.red + ' the time set is not a number! it is ' + this.time + ' please fix this')
               try {

               } catch (E) {
                    console.error('[DEBUG]'.red + ' ' + E)
               } finally {
                   const ms = require('ms')
                   console.warn('[DEBUG]'.yellow + ` the timer has started for ${this.time}(${ms(this.time)}) and will be ended after this period!`) 
               }
                setTimeout(async () => { client.destroy(), console.warn('[DEBUG]'.yellow + ' Shutting down') }, this.time)
            }
        })
        client.login(this.token).catch(err => console.error('[DEBUG]'.grey + ' ' + err))
    }
}

}
module.exports = Client;