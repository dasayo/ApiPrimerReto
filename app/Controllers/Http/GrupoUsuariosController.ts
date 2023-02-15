import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Grupo from 'App/Models/Grupo'
import Usuario from 'App/Models/Usuario'
import UsuarioGrupo from 'App/Models/UsuarioGrupo'

export default class GrupoUsuariosController {

  public async setRegistrarUsuarioGrupo({request, response}: HttpContextContract) {

    try{
      const dataGrupoUsario = request.only(['codigo_usuario', 'codigo_grupo', 'fecha_inicio'])
      const codigoUsuario = dataGrupoUsario.codigo_usuario
      const codigoGrupo = dataGrupoUsario.codigo_grupo
      const datosExistentes: Number = await this.getValidarDatosGrupoYUsuario(codigoGrupo, codigoUsuario)
      switch(datosExistentes){
        case 0:
          console.log(dataGrupoUsario.codigo_grupo);
          console.log(dataGrupoUsario.codigo_usuario);
          console.log(dataGrupoUsario.fecha_inicio);
          await UsuarioGrupo.create(dataGrupoUsario)
          console.log('Registro de usuario en grupo completo');

          response.status(200).json({message: 'Registro de usuario en grupo completo'})
          break;
        case 1:
          response.status(400).json({message: 'El usuario no se encuentra registrado en el grupo'})
          break;
        case 2:
          response.status(400).json({message: 'El usuario ya se encuentra registrado en el grupo'})
          break;
      }
    } catch (error) {
      console.log(error);
      response.status(500).json({message: 'Error en el servidor !!'})
    }
  }

  public async getValidarDatosGrupoYUsuario(codigo_grupo: Number, codigo_usuario: Number): Promise<Number> {
    let totalGrupo = await Grupo.query().where({"codigo_grupo": codigo_grupo}).count('*').from('grupos')
    let cantidadDatos = parseInt(totalGrupo[0].$extras['count'])

    if(cantidadDatos !== 0){
      /* Recuerda que en la siguiente linea daba error se cambio Usuario por Grupo en el query. */
      let totalUsuario = await Usuario.query().where({"codigo_usuario": codigo_usuario}).count('*').from('usuarios')
      cantidadDatos = parseInt(totalUsuario[0].$extras['count'])
      if(cantidadDatos !== 0){
        return 0;
      }else{
        return 2;
      }

    }else{
      return 1;
    }
  }

}
