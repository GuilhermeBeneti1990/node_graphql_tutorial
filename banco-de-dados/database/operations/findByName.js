const db = require("../../config/db")

db('profiles')
    .where("name", "like", "%ad%")
    .then(res => console.log(res))
    .finally(() => db.destroy())