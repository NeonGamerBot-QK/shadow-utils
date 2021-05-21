const dops = require(__dirname + '/ops.json')
var colors = require('colors')
const ee = require("events").EventEmitter;
const express = require('express')
class Express extends ee{
constructor(ops = dops) {
super()
    this.port = ops.port,
this.debug = ops.debug
this.app = express()
} 
start() {
    if(!this.debug) {
this.app.get('/', (req,res) => {
    res.send('Hello world!')
console.log('Hello world')
})
this.app.listen(this.port, () => {
    console.log('Express up on ' + this.port)
    this.emit('ready', this.port) 
})
this.app.set('port', this.port)
    } else {
        console.log('[DEBUG]'.bold + ' Running express')
        this.app.get('/', (req,res) => {
            console.log('[DEBUG]'.bold + ' attempting to send "hello world".\.\.')
            try{
                res.send('Hello world!')
                console.log('Hello world')
                console.log('[DEBUG]'.bold + ' sent hellow world')
            }catch (e) {
                console.error('[DEBUG]'.bold.red + ' ' + e)
            } finally {
                console.log('[DEBUG]'.bold + ' passed through app.get("/")')
            }
           
        })
        this.app.listen(this.port, () => {
            console.log('[DEBUG]'.bold + ' attempting to  start server .\.\.')
            try {
            console.log('Express up on ' + this.port)
            console.log('[DEBUG]'.bold + ' attempting to emit ready event .\.\.')
            this.emit('ready', this.port)
            console.log('[DEBUG]'.bold + ' emited \.')
            console.log('[DEBUG]'.bold + ' listening on the port')
            } catch (e) {
                console.error('[DEBUG]'.bold.red + ' ' + e)
            } finally {
                console.log('[DEBUG]'.bold + ' passed trough listening')
            } 
        })
        console.log('[DEBUG]'.bold + ' attempting to set port in app.\.\.')
        try {
            this.app.set('port', this.port)
            console.log('[DEBUG]'.bold + ' set port to' + this.port + ' .\.\.')
        } catch (e) {
            console.error('[DEBUG]'.bold + ' ' + e)
        } finally {
            console.log('[DEBUG]'.bold + ' passed through setting port..\.\.')
        }
        
        console.log('[DEBUG]'.bold + ' done. setup done .\.\.')
        
    }
}
}
module.exports = Express;