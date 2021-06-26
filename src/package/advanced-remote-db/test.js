const username = 'NeogieurgbergengGegae'
const password =  '123ge4gre5g6eg8e8rg7eg6e5ge4g'
const ARemoteDB = require('./')
const db = new ARemoteDB({
    reciver: true,
    tables: [{
        name: 'main',
        default: true
    }, {
        name: 'site'
    }],
    accounts: [{ username: 'NeogieurgbergengGegae', password: '123ge4gre5g6eg8e8rg7eg6e5ge4g'}],
    port: 3000
})
db.on('ready', () => { console.log('ready to work on ' + db.port) 
// console.log(db)
})
db.connect()
// ^^ SERVER ^^ 
//#region CLIENT
//const { ARemoteDB } = require('shadowbot-utils')
const dbb = new ARemoteDB({
    reciver: false,
    username: username,
    password: password,
    uri: 'http://localhost:3000'
})
dbb.connect().then(() => {
    const co = dbb.connection
    dbb.connection.on('open', () => console.log('[CONNEECY] opend'))
dbb.on('debug', console.log)
})
//#endregion re
db.on('delete', (key, table) => console.log(`[BASE] ${table}:${key} died`))
db.on('set', (table,key,value) => console.log(`[BAsE] ${table}:${key} = ${value}`))
dbb.on('delete', (key, table) => {
    console.log(`${key} was deleted in the table: ${table}`)
})
dbb.on('change', (table,key,value) => {
    console.log(`${table}:${key} = ${value}`)
})
dbb.set('main', 'foo', 'bar')
dbb.get('main', 'foo').then(console.log)
dbb.delete('main', 'foo').then(console.log)