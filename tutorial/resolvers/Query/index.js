const usuario = require('./Usuario')
const perfil = require('./Perfil')
const query = require('./Query')

 module.exports = {
    ...usuario,
    ...perfil,
    ...query
 }