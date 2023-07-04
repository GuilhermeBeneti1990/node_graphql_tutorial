const db = require("../config/db")

async function saveUser(name, email, password) {
    let user = await db('users')
        .where({ email })
        .first()

    if(!user) {
        let [ id ] = await db('users').insert({ name, email, password })
        user = await db('users').where( { id }).first()
    } else {
        await db('users').where({ id: user.id }).update({ name, email, password })
        user = { ...user, name, email, password }
    }

    return user
}

async function saveProfile(name, description) {
    let profile = await db('profiles').where({ name }).first()

    if(!profile) {
        let [ id ] = await db('profiles').insert({ name, description})
        profile = await db('profiles').where( { id }).first()
    } else {
        await db('profiles').where({ id: profile.id }).update({ name, description})
        profile = { ...profile, name, description }
    }

    return profile
}

async function addProfileToUser(user, ...profiles) {
    const user_id = user.id
    await db('users_profiles').where({ user_id }).delete()
    for(profile of profiles) {
        const profile_id = profile.id
        await db('users_profiles').insert({ user_id, profile_id })
    }
}

async function execute() {
    const user = await saveUser(
        "Doris",
        "doris@email.com",
        "123456"
    )
    const profileA = await saveProfile('RH', 'Human Resources')
    const profileB = await saveProfile('FN', 'Financial')

    console.log(user)
    console.log(profileA)
    console.log(profileB)

    await addProfileToUser(user, profileA, profileB)
}

execute()
    .catch(err => console.log(err))
    .finally(() => db.destroy())