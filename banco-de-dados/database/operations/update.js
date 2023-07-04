const db = require("../../config/db")

const newUser = {
    name: "Pedro",
    email: "pedro@email.com",
    password: "12345678"
}

async function update() {
    const { qtde } = await db('users').count('* as qtde').first()

    if(qtde === 0) {
        await db('users').insert(newUser)
    }

    let { id } =  await db('users').select('id').limit(1).first()
    await db('users').where({ id }).update({ 
        name: 'Pedro Alterado',
        email: "emailAlterado@email.com"
    })

    return db('users').where({ id })
}

update()
    .then(user => console.log(user))
    .finally(() => db.destroy())