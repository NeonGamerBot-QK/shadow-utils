const { RemoteDB } = require('./')
const db = new RemoteDB({
username: 'Neo$$nGa$$$mer',
password: 'b$$o$$t',
uri: 'https://notme.npm.repl.co/' // i had to use a repl.it....
})
db.on('connect', (res) => res.json().then(console.log))
db.connect()
db.get('nene').then(console.log)
db.delete('neone').then(console.log) // expecting a 204
// reciver side 
const  RemoteDB  = require('./') // i mean replt
const db = new RemoteDB({
    reciver: true,
    path: './cloud.json',
    accounts: [{ username: 'some  username', password: 'b$o$t'}, {username: 'u$s$e$r2', password: '$us-e$r#2'}],
    port: 8080 // if your using this on pyredactol or localhost this is importint 
})
db.on('ready', () => console.log('ready'))
db.connect()