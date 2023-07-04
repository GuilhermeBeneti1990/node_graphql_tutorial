const db = require("../../config/db")

db('profiles')
    .where({ id: 2 })
    .first()
    .then(res => console.log(res))
    .finally(() => db.destroy())