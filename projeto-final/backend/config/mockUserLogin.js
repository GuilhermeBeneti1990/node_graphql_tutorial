const db = require('./db')
const { getUserLogged } = require('../resolvers/common/user')

const sql = `
    SELECT u.* from users u, users_profiles up, profiles p
        WHERE up.user_id = u.id AND up.profile_id = p.id AND u.active = 1 AND p.name = :nameProfile
        LIMIT 1 
`

const getUser = async nameProfile => {
    const res = await db.raw(sq, { nameProfile })
    return res ? res[0][0] : null
}

module.exports = async req => {
    const user = await getUser('admin')
    if(user) {
        const { token } = await getUserLogged(user)
        req.headers = {
            auhtorization: `Bearer ${token}`
        }
    }
}