const Express = require('./index.js').Express
const app = new Express({ 
    port: 3000,
    debug: false
})
app.start()
app.on('ready', (port) => {
    console.log(port)
})