import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tools extends BaseSchema {
  protected tableName = 'tools'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('title').notNullable()
      table.string('description').nullable()
      table.string('link').nullable()

      table
        .foreign('tags_id')
        .references('id')
        .inTable('tags')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
