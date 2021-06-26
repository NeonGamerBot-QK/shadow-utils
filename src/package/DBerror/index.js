
class DBError {
    constructor(error) {
        throw console.error(`\x1b[33m[DB ERROR] \x1b[8m ` + error)
    }

}
module.exports = DBError;