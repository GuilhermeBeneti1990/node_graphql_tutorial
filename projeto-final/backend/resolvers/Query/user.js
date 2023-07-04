const db = require('../../config/db')
const bcrypt = require('bcrypt-nodejs')
const { getUserLogged } = require('../common/user')

module.exports = {
    async login(_, { data }) {
        const user = await db('users').where({ email: data.email }).first()

        if(!user) {
            throw new Error('Invalid user or password')
        }

        const samePassword = bcrypt.compareSync(data.password, user.password)

        if(!samePassword) {
            throw new Error('Invalid password')
        }

        return getUserLogged(user)
    },
    users(_, args, ctx) {
        ctx && ctx.validateAdmin()
        return db('users')
    },
    user(_, { filter }, ctx) {
        ctx && ctx.validateUserFilter(filter)
        if(!filter) return null
        const { id, email } = filter
        if(id) {
            return db('users')
                .where({ id })
                .first()
        } else if(email) {
            return db('users')
                .where({ email })
                .first()
        } else {
            return null
        }
    },
}