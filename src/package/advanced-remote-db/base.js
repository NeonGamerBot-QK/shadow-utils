app.post(`/${TABLE}/set`, (req,res) => {
    this.debug(`[DB] => new connection checking params`)
    if(!this.accounts.get(`${req.headers[`username`]}@${req.headers[`password`]}`)) return res.status(401).json({ status: 401, error: `INVALID_LOGIN`});
      if(!req.body.key || !req.body.value) return res.status(400).json({ status: 400, message: `MISSING_QUERYS`})
      let table;
      let user;
      let timestamp;
  this.debug(`[DB] => new connection checking params`)
      try {
          table = req.body[`table`]
      } catch {
          table = this.tables[0].name
      }
      const old = JSON.parse(fs.readFileSync(this.path + `/${table}/${table}.json`))
      try {
timestamp = JSON.parse(fs.readFileSync(this.path + `/${table}/${table}.json`))[req.body.key].creationtimestamp
      } catch {
timestamp = Date.now()
      }
      try {
          user = JSON.parse(fs.readFileSync(this.path + `/${table}/${table}.json`))[req.body.key].user.created
      } catch {
          user = req.headers[`username`]
      }
      const body = { key: req.body.key, value: req.body.value, creationtimestamp: timestamp, lasteditstamp: Date.now(), user: {
          created: user,
          last_edit: req.headers[`username`]
      } }
      if(this.Isclosed) return res.status(403).json({ message: `closed` })
      
      const Table = JSON.parse(fs.readFileSync(this.path + `/${table}/${table}.json`))
      Table[req.body.key] = body
      
      fs.appendFileSync(`${this.path}/${table}/logs.txt`, `\nthe item ${req.body.key} now is equal to ${req.body.value} this was by ${body.user.last_edit} | Today at ${new Date().toLocaleTimeString()}`)
      this._saveDatabase(table, Table)
      if(old[req.body.key]) {
      res.status(200).json({ status: 200, message: body })
      } else {
          res.status(201).json({ status: 201, message: body })
      }
   
   })
   app.delete(`/${TABLE}/delete`, (req,res) => {
    if(!this.accounts.get(`${req.headers[`username`]}@${req.headers[`password`]}`)) return res.status(401).json({ status: 401, error: `INVALID_LOGIN`});
     const body = req.body
      // console.log(body)
      if(this.Isclosed) return res.status(403).json({ error: `closed` })
      const Table = JSON.parse(fs.readFileSync(`${this.path}/${body.table}/${body.table}.json`))
      delete Table[body.key]
      fs.appendFileSync(`${this.path}/${t}/logs.txt`, `\n deleted ${body.key}`)
      this._saveDatabase(body.table, Table)
      res.status(204).end()
     
   })
   app.get(`/${TABLE}/all`, (req,res) => {
    if(!this.accounts.get(`${req.headers[`username`]}@${req.headers[`password`]}`)) return res.status(401).json({ status: 401, error: `INVALID_LOGIN`});
      let table;
      if(!req.query.table) {
table = this.tables.filter(t => t.default)[0] || this.tables[0]
      }
      if(this.Isclosed) return res.status(403).json({ error: `closed` })
      
    let db = Object.entries(JSON.parse(fs.readFileSync(`${this.path}${req.query.table}/${req.query.table}.json`)));
let ress = [];
for (const entry of db) {
    ress.push(entry.pop());
}
  res.status(200).json({ status: 200, message: ress || [] })
})
   app.get(`/${TABLE}/get`, (req,res) => {
    if(!this.accounts.get(`${req.headers[`username`]}@${req.headers[`password`]}`)) return res.status(401).json({ status: 401, message: `INVALID_LOGIN`});
      if(!req.query.key) return res.status(400).json({ status: 400, message: `Missing ?key=<name>`})
      if(!req.query.table) return res.status(400).json({ status: 400, message: `Missing &table=<name>`})
      if(this.Isclosed) return res.status(403).json({ error: `closed` })
     const object = JSON.parse(fs.readFileSync(this.path + `/${req.query.table}/${req.query.table}.json`))[req.query.key]['value']
      res.status(200).json({ status: 200, message: object })
     
   })