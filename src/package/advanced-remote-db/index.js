const dops = require(__dirname +'/ops.json')
const fs = require('fs')
const events = require('events').EventEmitter
var colors = require('colors')
let x;
let y;
const express = require('express')
class ARemoteDB extends events {
    constructor(ops = dops) {
        super()
        this.reciver = ops.reciver
        x = 0
        y = 0
        this.ops = ops
        if(!ops.reciver) {
            const prams = [ops.uri, ops.username, ops.password] 
            prams.forEach(pram => {
                if(!pram) throw `MISSING_PRAM_${pram}`
            })
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
           if(!ops.tables || !Array.isArray(ops.tables)) throw 'INVALID_TABLES' // invalid tables or null format: { name: 'mains', default: true/false }
           if(!ops.accounts || !Array.isArray(ops.accounts) )  throw 'INVALID_ACCOUNTS' // Missing accounts as an array fo
            this.tables = ops.tables
            this.accounts = new Map();
            this.port = ops.port 
            this.path = ops.path || './db/'
            this.see = ops.see || true
            ops.accounts.forEach((acc, i) => {
                if(!acc.username) throw `INVALID_USERNAME @ ${i}` 
                if(!acc.password) throw `INVALID_PASSWORD @ ${i}` 
                acc['createdstamp'] = Date.now()
                acc.id = Buffer.from(`${Date.now()}`).toString('base64').trim()
           this.accounts.set(`${acc.username}@${acc.password}`, acc) 
            });
            this.Isclosed = true
            x = 64
            y = 64
            this.tables.forEach(t => {
               
                if(!fs.existsSync(this.path)) {
                    fs.mkdirSync(this.path)
                }
                if (!fs.existsSync(this.path + '/' + t.name)) {
                             fs.mkdir(this.path + `/${t.name}`, null, (err) => {
                                 if (err) {
                                     throw err;
                                 }
                                 if(!fs.existsSync(this.path + `/${t.name}/${t.name}.json`)) {
                                 fs.writeFileSync(this.path + `/${t.name}/${t.name}.json`, '{}')
                                 } if(!fs.existsSync(this.path + `/${t.name}/raw.json`)) {
                                 fs.writeFileSync(this.path + `/${t.name}/raw.json`, '{}')
                                 } if(!fs.existsSync(this.path + `/${t.name}/pretty.json`)) {
                                 fs.writeFileSync(this.path + `/${t.name}/pretty.json`, '{}')
                                 } if(!fs.existsSync(this.path + `/${t.name}/logs.txt`)) {
                                 fs.writeFileSync(this.path + `/${t.name}/logs.txt`, `Created today at ${new Date().toTimeString()} `)
                                 }
                                });
                         } else {
                            if(!fs.existsSync(this.path + `/${t.name}/${t.name}.json`)) {
                                fs.writeFileSync(this.path + `/${t.name}/${t.name}.json`, '{}')
                                } if(!fs.existsSync(this.path + `/${t.name}/raw.json`)) {
                                fs.writeFileSync(this.path + `/${t.name}/raw.json`, '{}')
                                } if(!fs.existsSync(this.path + `/${t.name}/pretty.json`)) {
                                fs.writeFileSync(this.path + `/${t.name}/pretty.json`, '{}')
                                } if(!fs.existsSync(this.path + `/${t.name}/logs.txt`)) {
                                fs.writeFileSync(this.path + `/${t.name}/logs.txt`, `Created today at ${new Date().toTimeString()} `)
                                }
                             }
                         })
        }
        
    }
async get(table, key) {

let res;
await this.fetch(this.uri + '/get?key=' + key.toString().replace(' ', '%20') + `&table=${table}`, {
    method: 'get',
    headers: this.headers
}).then(req => req.json().then(json => res = json))
return await res['message'] || res['error'] || null
}
async all(table) {
   let res; 
     await this.fetch(this.uri + '/all?table=' + table, {
        headers: this.headers,
    }).then(res => res.json().then(json => res = json))
await res.message || []
}
async set(table, key, value) {
let res;
if(typeof key !== 'string') return 400;
if(typeof value === 'function') {
    value = [ { } ]
}
    let timestamp;
    try{
timestamp = this.database[key].creationtimestamp
    }catch {
        timestamp = Date.now()
    }
    const body = { key: key, value: value, table: table}
await this.fetch(this.uri + '/set', {
    method: 'post',
    headers: this.headers,
    body: JSON.stringify(body)
}).then(req => req.json().then(json => res = json))
return await res['message'] || null
}

  /**
   * @param {string} main a table of yours
   */ 
async delete(table, key) {
    let res =  await this.fetch(this.uri + '/delete', {
        method: 'delete',
        headers: this.headers,
        body: JSON.stringify({ key: key,  table: table })
    })
    return await res.status; // 204 == good
}

async connect() {
    if(this.reciver) {
        // a lot of code here lol
        
        this.app = express()
        const app = this.app
        this.Isclosed = false
        if(!this.see) {app.get('/', (req,res) => res.send('bruh')) } 
        else {
app.get('/', (req,res) => {
    res.json({ endpoints: [{
        GET: '/set',
        POST: '/v-changes',
        POST: '/data',
        GET: '/get-data',
        GET: { name: '/login', works: true },
        GET: '/data', 
    }], Authorisation: "username@password <-- format", out: false})
})
app.get('/login', (req,res) => {
    res.sendFile(__dirname + '/files/index.html')
})
app.get('/data', (req,res) => {
    if(!this.accounts.get(`${req.query.username}@${req.query['password']}`)) return res.status(401).json({ status: 401, error: 'INVALID_LOGIN'});
      let table;
      if(!req.query.table) {
table = this.tables.filter(t => t.default)[0] || this.tables[0]
      }
      if(this.Isclosed) return res.status(403).json({ error: 'closed' })
      
    let db = Object.entries(JSON.parse(fs.readFileSync(`${this.path}${req.query.table}/${req.query.table}.json`)));
let ress = [];
for (const entry of db) {
    ress.push(entry.pop());
}
  res.status(200).json(ress)
})
        }
        app.get('/disconnect', (req,res) => {
            if(!this.accounts.get(`${req.headers['username']}@${req.headers['password']}`)) return res.status(401).json({ status: 401, error: 'INVALID_LOGIN'});
            setTimeout(() => {
                res.status(204)
            }, 500)
        })
        
        app.get('/connection', (req,res) => {
           this.errormessage = { status: 401, message: 'INVALID_LOGIN' }
        if(!this.accounts.get(`${req.headers['username']}@${req.headers['password']}`)) return res.status(401).json({ status: 401, error: 'INVALID_LOGIN'});
            const start = req.headers['password'].split('')[0]
        const last = req.headers['password'].slice(req.headers['password'].length - 1)
        console.log(`new login, {
            username: ${req.headers['username']}
            password: ${req.headers['password']}
        }`)
        res.json({ connected: true, credentials: {
            username: req.headers['username'],
            date: Date.now(),
            date2: new Date()
        }})
        })
        app.use(express.json());
   app.post('/set', (req,res) => {
    if(!this.accounts.get(`${req.headers['username']}@${req.headers['password']}`)) return res.status(401).json({ status: 401, error: 'INVALID_LOGIN'});
      if(!req.body.key || !req.body.value) return res.status(400).json({ status: 400, message: 'MISSING_QUERYS'})
      let table;
      let user;
      let timestamp;
      try {
          table = req.body['table']
      } catch {
          table = this.tables[0].name
      }
      try {
timestamp = JSON.parse(fs.readFileSync(this.path + `/${table}/${table}.json`))[req.body.key].creationtimestamp
      } catch {
timestamp = Date.now()
      }
      try {
          user = JSON.parse(fs.readFileSync(this.path + `/${table}/${table}.json`))[req.body.key].user.created
      } catch {
          user = req.headers['username']
      }
      const body = { key: req.body.key, value: req.body.value, creationtimestamp: timestamp, lasteditstamp: Date.now(), user: {
          created: user,
          last_edit: req.headers['username']
      } }
      if(this.Isclosed) return res.status(403).json({ message: 'closed' })
      
      const Table = JSON.parse(fs.readFileSync(this.path + `/${table}/${table}.json`))
      Table[req.body.key] = body
      
      fs.appendFileSync(`${this.path}/${table}/logs.txt`, `\nthe item ${req.body.key} now is equal to ${req.body.value} this was by ${body.user.last_edit} | Today at ${new Date().toLocaleTimeString()}`)
      this._saveDatabase(table, Table)
      res.status(200).json({ status: 200, message: body })
   
   })
   app.delete('/delete', (req,res) => {
    if(!this.accounts.get(`${req.headers['username']}@${req.headers['password']}`)) return res.status(401).json({ status: 401, error: 'INVALID_LOGIN'});
     const body = req.body
      console.log(body)
      if(this.Isclosed) return res.status(403).json({ error: 'closed' })
      const Table = JSON.parse(fs.readFileSync(`${this.path}/${body.table}/${body.table}.json`))
      delete Table[body.key]
      fs.appendFileSync(`${this.path}/${t}/logs.txt`, `\n deleted ${body.key}`)
      this._saveDatabase(body.table, Table)
      res.status(204).end()
     
   })
   app.get('/all', (req,res) => {
    if(!this.accounts.get(`${req.headers['username']}@${req.headers['password']}`)) return res.status(401).json({ status: 401, error: 'INVALID_LOGIN'});
      let table;
      if(!req.query.table) {
table = this.tables.filter(t => t.default)[0] || this.tables[0]
      }
      if(this.Isclosed) return res.status(403).json({ error: 'closed' })
      
    let db = Object.entries(JSON.parse(fs.readFileSync(`${this.path}${req.query.table}/${req.query.table}.json`)));
let ress = [];
for (const entry of db) {
    ress.push(entry.pop());
}
  res.status(200).json({ status: 200, message: ress || [] })
})
   app.get('/get', (req,res) => {
    if(!this.accounts.get(`${req.headers['username']}@${req.headers['password']}`)) return res.status(401).json({ status: 401, error: 'INVALID_LOGIN'});
      if(!req.query.key) return res.status(400).json({ status: 400, error: 'Missing ?key=<name>'})
      if(!req.query.table) return res.status(400).json({ status: 400, message: 'Missing &table=<name>'})
      if(this.Isclosed) return res.status(403).json({ error: 'closed' })
     const object = JSON.parse(fs.readFileSync(this.path + `/${req.query.table}/${req.query.table}.json`))[req.query.key].value
      res.status(200).json({ status: 200, message: object })
     
   })
        this.server = app.listen(this.port, () => this.emit('ready'))
    } else {
this.connection = await this.fetch(this.uri + '/connection', {
    headers: this.headers
}).catch(e => { try {console.error(e.toString().bgRed) } finally { process.exit(1) } })
this.emit('connect', this.connection)
}
}

/**
 * subscribe to github repository so that you can receive feeds related to it
 * @param {string} reason reason of closing/
 */
async close(r) {
    if(!this.reciver) {
        await this.fetch(this.uri + '/disconnect', {
            method: 'get',
            headers: this.headers
        })
        this.connection = null
        this.Isclosed = true
    } else {
        this.Isclosed = true
    }
}
destroy(r) {
    if(!this.reciver) {
      
        process.exit(1)
    } else {
        this.server.close(() => {
           
            process.exit(1)
        })
    }
}
_saveDatabase(t, data) {
    if(!this.reciver) return;
    fs.writeFileSync(this.path + `/${t}/${t}.json`, JSON.stringify(data, null, 2))
    fs.writeFileSync(`${this.path}/${t}/raw.json`, JSON.stringify(data))
    fs.writeFileSync(`${this.path}/${t}/pretty.json`, JSON.stringify(data, null, 2))
    fs.appendFileSync(`${this.path}/${t}/logs.txt`, `\n Database Saved!`)
}
}
module.exports = ARemoteDB;