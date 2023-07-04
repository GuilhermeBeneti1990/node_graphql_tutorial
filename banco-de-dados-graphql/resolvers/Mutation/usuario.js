const db = require('../../config/db')
const { perfil: obterPerfil } = require('../Query/perfil')
const { usuario: obterUsuario } = require('../Query/usuario')

module.exports = {
    async novoUsuario(_, { dados }) {
        try {
            const perfisIds = []
            if(dados.perfis) {
                for(let filtro of dados.perfis) {
                    const perfil = await obterPerfil(_, { filtro })
                    if(perfil) perfisIds.push(perfil.id)
                }
            }

            delete dados.perfis

            const [ id ] = await db('usuarios').insert(dados)

            for(let perfil_id of perfisIds) {
                await db('usuarios_perfis').insert({ perfil_id, usuario_id: id })
            }

            return db('usuarios').where({ id }).first()
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    },
    async excluirUsuario(_, args) {
        try {
            const usuario = await obterUsuario(_, args)
            if(usuario) {
                const { id } = usuario
                await db('usuarios_perfis').where({ usuario_id: id }).delete()
                await db('usuarios').where({ id }).delete()
            }
            return usuario
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    },
    async alterarUsuario(_, { filtro, dados }) {
        try {
            const usuario = await obterUsuario(_, { filtro })
            if(usuario) {
                const { id } = usuario
                if(dados.perfis) {
                    await db('usuarios_perfis').where({ usuario_id: id }).delete()

                    for(let filtro of dados.perfis) {
                        const perfil = await obterPerfil(_, { filtro })
                        perfil && await db('usuarios_perfis').insert({ perfil_id: perfil.id, usuario_id: id})
                    }
                }
                delete dados.perfis

                await db('usuarios').where({ id }).update(dados)
            }

            return !usuario ? null : { ...usuario, ...dados }
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    }
}