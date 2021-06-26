const dops = require(__dirname +'/ops.json')
const fs = require('fs')
const events = require('events').EventEmitter
// web sockets :)
var colors = require('colors')
let x;
let y;
const express = require('express')
class RemoteDB extends events {
    constructor(ops = dops) {
        super()
        this.reciver = ops.reciver
        x = 0
        y = 0
        this.ops = ops
        if(!ops.reciver) {
x = 8
y = 8
this.uri = ops.uri
this.username = ops.username
this.password = ops.password
this.ws = null
this.connection = null
this.connected = false
this.fetch = require('node-fetch')
this.headers = { username: ops.username, password: ops.password, 'Content-type': 'application/json'}
}
        if(ops.reciver) {          
           if(!ops.path || typeof ops.path !== 'string') throw 'INVALID_PATH' // invalid path or null
           if(!ops.accounts || !Array.isArray(ops.accounts))  throw 'INVALID_ACCOUNTS' // Missing accounts as an array
            this.path = ops.path 
            this.accounts = ops.accounts
            this.database = this._getDatabase()
            this.addAccounts = function(username, password) {
this.accounts.push({ username: username, password: password })
            }
            this.Isclosed = true
            x = 64
            y = 64
        }
        
    }
async get(key) {

let res;
await this.fetch(this.uri + '/get?key=' + key.toString().replace(' ', '%20'), {
    method: 'get',
    headers: this.headers
}).then(req => req.json().then(json => res = json))
return await res['message'] || null
}
async all() {
   let res; 
     await this.fetch(this.uri + '/all', {
        headers: this.headers,
    }).then(res => res.json().then(json => res = json))
await res.message || null
}
async set(key, value) {
let res;

    let timestamp;
    try{
timestamp = this.database[key].creationtimestamp
    }catch {
        timestamp = Date.now()
    }
    const body = { key: key, value: value}
await this.fetch(this.uri + '/set', {
    method: 'post',
    headers: this.headers,
    body: JSON.stringify(body)
}).then(req => req.json().then(json => res = json))
return await res['message'] || null
} 
async delete(key) {
    let res =  await this.fetch(this.uri + '/delete', {
        method: 'delete',
        headers: this.headers,
        body: JSON.stringify({ key: key })
    })
    return await res.status; // 204 == good
}
async connect() {
    if(this.reciver) {
        // a lot of code here lol
        this.app = express()
        const app = this.app
        this.Isclosed = false
        app.get('/', (req,res) => res.send('bruh'))
        app.get('/connection', (req,res) => {
           this.errormessage = { status: 401, error: 'INVALID_LOGIN'}
            if(!this.accounts.some(user => user.username === req.headers['username'] && user.password === req.headers['password'])) return res.status(401).json({ status: 401, error: 'INVALID_LOGIN'});
        const start = req.headers['password'].split('')[0]
        const last = req.headers['password'].slice(req.headers['password'].length - 1)
        console.log(`new login`, {
            username: req.headers['username'],
            password: start + '*******' + last
        }, req.ip)
        res.json({ ip: req.ip, endpoints: [{ POST: '/set', DESCRIPTION: "sets a var" }] })
        })
        app.use(express.json());
   app.post('/set', (req,res) => {
      if(!this.accounts.some(user => user.username === req.headers['username'] && user.password === req.headers['password'])) return res.status(401).json(this.errormessage)
      ;
      let user;
      let timestamp;
      try {
timestamp = this.database[key].creationstamp
      } catch {
timestamp = Date.now()
      }
      try {
          user = this.database[req.body.key].user.created
      } catch {
          user = req.headers['username']
      }
      const body = { key: req.body.key, value: req.body.value, creationtimestamp: timestamp, lasteditstamp: Date.now(), user: {
          created: user,
          last_edit: req.headers['username']
      } }
      console.log(body)
      if(this.Isclosed) return res.status(403).json({ error: 'closed' })
      this.database[req.body.key] =  body;
      this._saveDatabase()
      res.status(200).json({ status: 200, message: `${body['key']} = ${body['value']} `})
   
   })
   app.delete('/delete', (req,res) => {
     if(!this.accounts.some(user => user.username === req.headers['username'] && user.password === req.headers['password'])) return res.status(401).json(this.errormessage)
      ;
      const body = req.body
      console.log(body)
      if(this.Isclosed) return res.status(403).json({ error: 'closed' })
      delete this.database[body.key]    
      this._saveDatabase()
      res.status(204).json({ status: 204, message: ` ${body.key} was delete`})
     
   })
   app.get('/all', (req,res) => {
       if(!this.accounts.some(user => user.username === req.headers['username'] && user.password === req.headers['password'])) return res.status(401).json(this.errormessage)
      ;
      
      if(this.Isclosed) return res.status(403).json({ error: 'closed' })
      
    let db = Object.entries(this.database);
let ress = [];
for (const entry of db) {
    ress.push(entry);
}
  res.status(200).json({ status: 200, message: ress.pop() })
   })
   app.get('/get', (req,res) => {
       if(!this.accounts.some(user => user.username === req.headers['username'] && user.password === req.headers['password'])) return res.status(401).json(this.errormessage)
      ;
      if(!req.query.key) return res.status(400).json({ status: 400, error: 'Missing ?key=<name>'})
      if(this.Isclosed) return res.status(403).json({ error: 'closed' })
     const object = this.database[req.query.key]
      res.status(200).json({ status: 200, message: object})
     
   })
        app.listen(this.port, () => this.emit('ready'))
    } else {
this.connection = await this.fetch(this.uri + '/connection', {
    headers: this.headers
}).catch(e => console.error(e.toString().bgRed))
this.emit('connect', this.connection)
    }
}
_getDatabase() {
    if(!this.reciver) return;
    if(!fs.existsSync(this.path)) {
        fs.writeFileSync(this.path, '{}')
    }
    return JSON.parse(fs.readFileSync(this.path))
}
_saveDatabase() {
    if(!this.reciver) return;
    return fs.writeFileSync(this.path, JSON.stringify(this.database)) || 200
}
}
class Aoijs {
test() {
    console.log('hello world')
}
}
module.exports = { default: RemoteDB, aoijs: Aoijs} ;