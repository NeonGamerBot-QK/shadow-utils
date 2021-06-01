const log = require('./logger.js')
const fs = require('fs')
function load_dir(dirs) {
    log('Loaded ' + __dirname + `/package/${dirs}/index.js`, false) 
}
const create = function(m) {
    if(m === 'DEFAULT') return;
    console.log(m)
}
const testing = 'hi' || { tes: 'hi', test: 'tested'} 
const dirs = ['client', 'express', 'db']
dirs.forEach(e => load_dir(e))
module.exports = {
Client: require(`./package/client/index`),
Express: require('./package/express/index'),
DB: require('./package/db/index'),
Version: require('../package.json').version,
create,
default: create('DEFAULT'), // dont change
RemoteDB: {  aoijs: require('./package/-remote-db/index').aoijs}, 
RemoteDB: require('./package/-remote-db/index').default,
ARemoteDB: require('./package/advanced-remote-db/index')
}

