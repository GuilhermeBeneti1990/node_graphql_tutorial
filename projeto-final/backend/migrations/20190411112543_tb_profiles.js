
exports.up = function(knex, Promise) {
  return knex.schema.createTable('profiles', table => {
      table.increments('id').primary()
      table.string('name').notNull().unique()
      table.string('description').notNull()
  }).then(function () {
      return knex('profiles').insert([
          { nome: 'default', rotulo: 'Default Profile' },
          { nome: 'admin', rotulo: 'Administrator' },
      ])
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('profiles')
};
