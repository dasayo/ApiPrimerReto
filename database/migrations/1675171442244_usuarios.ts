import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Usuarios extends BaseSchema {
protected tableName = 'usuarios'

public async up () {
this.schema.createTable(this.tableName, (table) => {
/**
* Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
*/
table.integer('codigo_usuario').primary().unsigned().unique()
table.string('nombre_usuario', 100).notNullable()
table.string('contrasena', 100).notNullable()
table.string('email', 100).notNullable()
table.string('telefono', 100).notNullable()
table.timestamps(false)
})
}

public async down () {
this.schema.dropTable(this.tableName)
}
}
