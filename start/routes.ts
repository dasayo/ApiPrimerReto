/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/hello', async () => {
  return { hello: 'world' }
})


Route.group(() => {
  Route.get('/listar-usuario/:id', 'UsuariosController.getListarUsuario')
  Route.get('/listar-todo', 'UsuariosController.getListarUsuarios')
  Route.get('/filtrar-usuarios/:search', 'UsuariosController.filtrarUsuarios')
  Route.get('/listar-perfil', 'UsuariosController.getListarUsuariosYPerfil')
  Route.get('/listar-publicaciones', 'UsuariosController.getListarUsuariosYPublicacion')
  Route.get('/listar-usuarios-grupos', 'UsuariosController.getListarUsuariosYGrupo')
  Route.get('/listar-grupos', 'GruposController.getListarGrupos')

  Route.put('/actualizar-usuario/:id', 'UsuariosController.actualizarUsuario')

  Route.delete('/eliminar-usuario/:id', 'UsuariosController.eliminarUsuario')

  Route.post('/registrar-usuario', 'UsuariosController.setRegistrarUsuario')
  Route.post('/registrar-perfil', 'PerfilsController.setRegistrarPerfil')
  Route.post('/registrar-publicacion', 'PublicacionesController.setRegistrarPublicacion')
  Route.post('/registrar-grupo', 'GruposController.setRegistrarGrupo')
  Route.post('/registrar-usuario-grupo', 'GrupoUsuariosController.setRegistrarUsuarioGrupo')





}).prefix('/api')
