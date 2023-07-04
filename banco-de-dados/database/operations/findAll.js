const db = require("../../config/db")

// db('profiles')
//     .then(res => console.log(res))
//     .finally(() => db.destroy())

db('profiles')
    .select('name')
    .then(res => console.log(res))
    .finally(() => db.destroy())