import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Publicacione from "App/Models/Publicacione";

export default class PublicacionesController {
  private async getValidarPublicacionExistente(
    codigo_publicacion: Number
  ): Promise<Number> {
    const total = await Publicacione.query()
      .where({ codigo_publicacion: codigo_publicacion })
      .count("*")
      .from("publicaciones");
    return parseInt(total[0]["count(*)"]);
  }

  async setRegistrarPublicacion({ request, response }: HttpContextContract) {
    try {
      const dataPublicaciones = request.only([
        "codigo_publicacion",
        "codigo_usuario",
        "titulo",
        "cuerpo",
      ]);
      const codigoPublicacion = dataPublicaciones.codigo_publicacion;
      const codigoPublicacionExistente: Number =
        await this.getValidarPublicacionExistente(codigoPublicacion);

      if (codigoPublicacionExistente === 0) {
        await Publicacione.create(dataPublicaciones);
        response
          .status(200)
          .json({ msg: "Registro de publicacion completado con exito" });
      } else {
        response
          .status(400)
          .json({
            msg: "Error, el codigo de publicacion ya se encuentra registrado",
          });
      }
    } catch (error) {
      response.status(500).json({ msg: "Error en el servidor!" });
    }
  }

  public async actualizarPublicacion({
    request,
    response,
  }: HttpContextContract) {
    try {
      const id = request.param("id");
      const pub = request.only(["titulo", "cuerpo"]);

      await Publicacione.query().where("codigo_publicacion", id).update({
        titulo: pub.titulo,
        cuerpo: pub.cuerpo,
      });
      
      response
        .status(200)
        .json({ msg: "Registro de publicacion completado con exito" });
    } catch (error) {
      console.log(error);
      response.status(500).json({ msg: "Error en el servidor!" });
    }
  }

  public async eliminarPublicacion({ request, response }: HttpContextContract) {
    try {
      const id = request.param("id");
      await Publicacione.query().where("codigo_publicacion", id).delete();
      return { msg: "Registro Eliminado" };
    } catch (error) {
      console.log(error);
      response.status(500).json({ msg: "Error en el servidor!" });
    }
  }

  public async publicacionPorUsuario({
    request,
    response,
  }: HttpContextContract) {
    try {
      const userid = request.param("id");
      const pubs = await Publicacione.query().where("codigo_usuario", userid);
      return pubs;
    } catch (error) {
      console.log(error);
      response.status(500).json({ msg: "Error en el servidor!" });
    }
  }
}
