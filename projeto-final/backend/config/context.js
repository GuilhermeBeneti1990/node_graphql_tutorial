const jwt = require('jwt-simple')

module.exports = async ({ req }) => {
    //Mock User Login
    await require('./mockUserLogin')(req)

    const auth = req.headers.authorization
    console.log(auth)

    const token = auth && auth.substring(7)

    let user = null
    let admin = false

    if(token) {
        try {
            let tokenContent = token.decode(token, process.env.APP_AUTH_SECRET)
            if(new Date(tokenContent.exp * 1000) > new Date()) {
                user = tokenContent
            } else {
                throw new Error('Expired token!')
            }
        } catch (error) {
            //Invalid token
            console.log(error)
            throw new Error('Invalid Token!')
        }
    }

    if(user && user.profiles) {
        admin = user.profiles.includes('admin')
    }

    const err = new Error('Access Denied!')

    return {
        user,
        admin,
        validateUser() {
            if(!user) throw err
        },
        validateAdmin() {
            if(!admin) throw err
        },
        validateUserFilter(filter) {
            if(admin) return
            if(!user) throw err
            if(!filter) throw err

            const { id, email } = filter
            if(!id && !email) throw err

            if(id && id !== user.id) throw err
            if(email && email !== user.email) throw err
        }
    }
}