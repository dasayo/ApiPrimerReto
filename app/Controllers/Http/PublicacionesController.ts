import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Publicacione from 'App/Models/Publicacione'

export default class PublicacionesController {


  async setRegistrarPublicacion({request, response}: HttpContextContract) {
    try{
      const dataPublicacion = request.only([
        'codigo_publicacion', 'codigo_usuario', 'titulo', 'cuerpo'
      ])
      const codigoPublicacion = dataPublicacion.codigo_publicacion;
      const codigoPublicacionExistente: Number = await this.getValidarPublicacionExistente(codigoPublicacion);
      if(codigoPublicacionExistente === 0){
        await Publicacione.create(dataPublicacion)
        response.status(200).json({"msg": 'Registro de publicacion completo'})
      }else{
        response.status(400).json({"msg": 'Error, La publicacion ya se encuentra registrada'})
      }
    }catch(error){
      response.status(500).json({"msg": 'Error en el servidor !!'})
    }

  }

  async getValidarPublicacionExistente(codigoPublicacion: string){

    const publicacion = await Publicacione.query().where('codigo_publicacion', codigoPublicacion).count('*').from('publicaciones')
    return parseInt(publicacion[0].$extras['count'])
  }

}
