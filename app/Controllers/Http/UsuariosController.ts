
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'


export default class UsuariosController {

  public async getListarUsuarios(): Promise<Usuario[]>{
    const user = await Usuario.all()
    return user;
  }

  public async getListarUsuario({request}: HttpContextContract): Promise<Usuario[]>{
    let idUsuario = request.param('id')
    const user = await Usuario.query().where('codigo_usuario', idUsuario)
    return user;
  }

  public async actualizarUsuario({request, response}: HttpContextContract) {
    const id = request.param('id');
    const user = request.all();
    await Usuario.query().where('codigo_usuario', id).update({
      nombre_usuario: user.nombre,
      contrasena: user.contrasena,
      email: user.email,
      telefono: user.telefono
    });

    response.status(200).json({"msg": 'Usuario actualizado Correctamente'});
  }

  public async eliminarUsuario({request}: HttpContextContract) {
    const id = request.param('id');
    await Usuario.query().where('codigo_usuario', id).delete();
    return 'Usuario eliminado';
  }

  public async filtrarUsuarios({request}: HttpContextContract){
    const search = request.param('search');
    const user = await Usuario.query().where('nombre_usuario', 'like', `%${search}%`)
    return user;
  }


  public async getListarUsuariosYPerfil(): Promise<Usuario[]>{
    const user = await Usuario.query().preload('perfil')
    return user;
  }

  public async getListarUsuariosYPublicacion(): Promise<Usuario[]>{
    const user = await Usuario.query().preload('publicaciones')
    return user;
  }

  public async getListarUsuariosYGrupo(): Promise<Usuario[]>{
    const user = await Usuario.query().preload('grupos')
    return user;
  }

  public async setRegistrarUsuario({request, response}: HttpContextContract) {
    const dataUsuario = request.only([
      'codigo_usuario', 'nombre_usuario', 'contrasena', 'email', 'telefono', 'perfil'
    ])
    try {
      const codigoUsuario = dataUsuario.codigo_usuario;
      const usuarioExistente: Number = await this.getValidarUsuarioExistente(codigoUsuario);
      console.log(usuarioExistente)
      if(usuarioExistente === 0){
        await Usuario.create(dataUsuario)
        response.status(200).json({"msg": 'Registro completado con exito'})
      }else{
        response.status(400).json({"msg": 'Error, El usuario ya se encuentra registrado xd'})
      }
    }catch (error) {
      console.log(error)
      response.status(500).json({"msg": 'Error en el servidor !!'})
    }
  }

  public async getValidarUsuarioExistente(codigo_usuario: Number): Promise<Number> {

    const total = await Usuario.query().where({"codigo_usuario": codigo_usuario}).count('*').from('usuarios')
    console.log(total[0].$extras['count'])
    return parseInt(total[0].$extras['count'])
  }

}
