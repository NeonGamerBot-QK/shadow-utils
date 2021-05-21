const fs = require('fs')
const log_file = __dirname + '/logges.txt'
function log(content, debug) {
    try {if(debug) {
        console.log('[DEBUG] ' + 'Logging...')
    }
    fs.appendFileSync(log_file, content + '\n > ', function(err, res) {
        if(err) {
            if(debug) {
                console.error('[DEBUG] '.white + '[ERROR] '.red + err)
                return null;
            } else {
                err = {}
            }
            } else {
                if(debug) {
                    console.log('[DEBUG] '.white + 'saving log...')
                }
                return res;
            }
    })
} catch (e) {
    if(debug) {
        console.error('[DEBUG] '.white + e)
    } else {
        e = {}
    }
} finally {
    if(debug) {
        console.log('[DEBUG] '.white + 'Logging done...')
    }
}
}
module.exports = log;