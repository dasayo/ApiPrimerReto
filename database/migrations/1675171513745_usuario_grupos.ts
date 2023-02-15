import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsuarioGrupos extends BaseSchema {
  protected tableName = 'usuario_grupos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.integer('codigo_usuario').unsigned().index('codigo_usuario2')
      table.integer('codigo_grupo').unsigned().index('codigo_grupo')
      table.date('fecha_inicio').notNullable()
      table.foreign('codigo_usuario').references('usuarios.codigo_usuario').onDelete('cascade')
      table.foreign('codigo_grupo').references('grupos.codigo_grupo').onDelete('cascade')
      table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
