const { usuarios } = require('../../data/db')

module.exports = {
    usuarios(perfil) {
        const sels = usuarios
            .filter(u => u.perfil_id === perfil.id)
        return sels ? sels[0] : null
    }
}