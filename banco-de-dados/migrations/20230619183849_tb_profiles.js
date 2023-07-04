/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('profiles', table => {
    table.increments('id').primary()
    table.string('name').notNullable().unique()
    table.string('description').notNullable()
  }).then(function () {
    return knex('profiles').insert([
        { name: 'default', description: 'Default Profile' },
        { name: 'admin', description: 'Administrator Profile' },
        { name: 'master', description: 'Master of Universe Profile' }
    ])
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('profiles')
};
