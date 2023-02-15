import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Publicaciones extends BaseSchema {
  protected tableName = 'publicaciones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.integer('codigo_publicacion').primary().unsigned()
      table.string('titulo', 100).notNullable()
      table.string('cuerpo', 200).notNullable()
      table.integer('codigo_usuario').unsigned().index('codigo_usuario1')
      table.foreign('codigo_usuario').references('usuarios.codigo_usuario').onDelete('cascade')
      table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
