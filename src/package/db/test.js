const  DB  = require('./') // defined
const db = new DB({ 
    path: './database.json',
    debug: false
})
db.on('set', (key, value) => {
    console.log(`${key} = ${value}`)
})
db.on('delete', (key) => {
    console.log(key + ' was deleted')
})
db.on('ready', () => console.log('DB ready'))
db.on('close', () => console.log('closed'))
db.start()
db.set('hello', 'neon')
const val = db.get('hello')
console.log(val)
const array = [1, 2, 3, 4,5,6,7,8,9,10]
 array.forEach(i => {
db.set('hi' + i, i)
db.delete('hi' + i)
 })
 console.log(db.all())
 db.exit()