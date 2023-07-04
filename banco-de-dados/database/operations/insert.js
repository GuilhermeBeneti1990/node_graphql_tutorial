const db = require("../../config/db")

// const newProfile = {
//     name: 'operator',
//     description: 'Operator Profile'
// }

// db('profiles')
//     .insert(newProfile)
//         .then(res => console.log(res))
//         .catch(err => console.log(err.sqlMessage))
//         .finally(() => db.destroy())

const suProfile = {
    name: 'root' + Math.random(),
    description: "Super User"
}

db.insert(suProfile)
        .into('profiles')
        .then(res => console.log(res))
        .catch(err => console.log(err.sqlMessage))
        .finally(() => db.destroy())