const fs = require('fs')
const ee = require('events').EventEmitter
const dops = require(__dirname + '/ops.json')
class DB extends ee {
constructor (ops = dops) {
    super()
    this.path = ops.path
    this.debug = ops.debug
    this.database = this._getDatabase()
    this.Isclosed = true;
    this.ws = null
    this.allstorage = []
}
set(key, value) {
    
    if(this.Isclosed) return console.error('DB is closed!');
if(!this.debug) {
    let timestamp;
    try{
timestamp = this.database[key].creationtimestamp
    }catch {
        timestamp = Date.now()
    }
    this.database[key] = { key: key, value: value, creationtimestamp: timestamp, lasteditstamp: Date.now() };
    this._saveDatabse()
    this.emit('set', key, value)
    return value;
} else { 
    let timestamp;
    try{
timestamp = this.database[key].creationtimestamps
    }catch {
        timestamp = Date.now()
    }
    this.database[key] = { key: key, value: value, creationtimestamp: timestamp, lasteditstamp: Date.now() };
    this._saveDatabse()
    return value;
}
} get(key) {
    if(this.Isclosed) return console.error('DB is closed!');
if(!this.debug) {
return this.database[key].value
} else {
this.lasttransfer = Date.now()
    return this.database[key]
}
} delete(key) {
    if(!this.debug) {
        
        delete this.database[key]
        this.emit('delete', key)
        this._saveDatabse()
        } else {
            delete this.database[key]
            this.emit('delete', key)
            this._saveDatabse()
        }
}
size() {
    return fs.stat(this.path)
}
count() {
    let db = Object.entries(this.database);
let res = [];

for (const entry of db) {
  res.push(entry);
}

return res.length;
}
all() {
    let db = Object.entries(this.database);
let res = [];
for (const entry of db) {
    res.push(entry);
}

return res.pop();
}
destroy() {
    fs.unlinkSync(this.path)
    this.path = null
    this.ping = null
    this.Isclosed = true
}
async Ping() {
const d = await Date.now()
const a = Date.now()
    const da = await a * d

this.ping = Date.now() - da
return Math.round(da - Date.now())
}
start(ms) {
if(!ms) {
    if(!fs.existsSync(this.path)) {
        fs.appendFile(this.path, '{}')
    } 
    this.emit('ready')
    this.readyAt = Date.now()
    this.Isclosed = false
} else {
    if(typeof ms !== 'number') return this.start()
    setTimeout(this.start(),ms)
}
}
exit() {
    this._saveDatabse()
    this.database = null;
    this.ping = null
    this.Isclosed = true
    this.emit('close')
}
push(key, value) {
    let ar;
    const item = this.get(key)
    if(!value) {
        ar = []
    }
    if(Array.isArray(value)) {
        ar = item
    } if(!Array.isArray(value)){
        ar = []
    }
    let timestamp;
    try{
timestamp = this.database[key].creationtimestamp
    }catch {
        timestamp = Date.now()
    }
    ar.push(value)
    this.database[key] = { key: key, value: ar, createdTimestamp: timestamp, lasteditstamp: Date.now(), _v: ar.length}
    return { value: ar, length: ar.length}
}
// esentials
_getDatabase() {
    if(!fs.existsSync(this.path)) {
        fs.writeFileSync(this.path, '{}')
    }
    return JSON.parse(fs.readFileSync(this.path))
}
_saveDatabse() {
    fs.writeFileSync(this.path, JSON.stringify(this.database))
}
_getall() {
    return JSON.parse(fs.readFileSync(__dirname + '/session.json'))  
}
_saveall() {
    fs.writeFileSync(__dirname + '/session.json', JSON.stringify(this.allstorage))
}
_all(ob){
    this.allstorage.push(ob)
    this._saveall()

}
}
module.exports = DB;