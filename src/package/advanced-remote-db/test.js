const { ARemoteDB } = require('./')
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
console.log(db)
})
db.connect()
// ^^ SERVER ^^ 
//#region CLIENT
const { ARemoteDB } = require('shadowbot-utils')
const db = new ARemoteDB({
    reciver: false,
    username: 'NeejrgbongergreGgegaeg',
    password: '123456eiogheiogheoig887654',
    uri: 'http://localhost:3000'
})
db.connect().then(() => 
console.log(db.connection))
//#endregion re
