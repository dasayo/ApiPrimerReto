import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Grupo from 'App/Models/Grupo'

export default class GruposController {

  public async setRegistrarGrupo({request, response}: HttpContextContract) {

    try{
      const dataGrupo = request.only(['codigo_grupo', 'nombre_grupo'])
      const codigoGrupo = dataGrupo.codigo_grupo
      const codigoGrupoExistente = await this.getValidarCodigoGrupoExistente(codigoGrupo)
      if(codigoGrupoExistente === 0){
        await Grupo.create(dataGrupo)
        response.status(200).json({message: 'Grupo registrado correctamente'})
      }else{
        response.status(400).json({message: 'El código del grupo ya existe'})
      }
    } catch(error){
      response.status(500).json({message: 'Error en el servidor !!'})
    }

  }

  public async getListarGrupos(): Promise<Grupo[]> {
    const grupos = await Grupo.all()
    return grupos
  }

  public async getValidarCodigoGrupoExistente(codigoGrupo: number){
    const total = await Grupo.query().where({"codigo_grupo": codigoGrupo}).count('*').from('grupos')
    return parseInt(total[0].$extras['count'])
  }
}
