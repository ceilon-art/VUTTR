import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Env from '@ioc:Adonis/Core/Env'

export default class Tools extends BaseSchema {
  protected tableName = 'tools'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('cascade')
      table.string('title').notNullable()
      table.string('link').nullable()
      table.text('description').nullable()
      table
        .specificType(
          'tags', Env.get('DB_CONNECTION') === 'sqlite'
          ? 'character varying(255)'
          : 'character varying(255)[]'
        )
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
