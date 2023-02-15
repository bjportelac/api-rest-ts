import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Perfil from "App/Models/Perfil";

export default class PerfilsController {
  private async getValidarPerfilExistente(
    codigo_perfil: Number
  ): Promise<Number> {
    const total = await Perfil.query()
      .where({ codigo_perfil: codigo_perfil })
      .count("*")
      .from("perfils");
    return parseInt(total[0]["count(*)"]);
  }

  async setRegistrarPerfil({ request, response }: HttpContextContract) {
    try {
      const dataPerfil = request.only([
        "codigo_perfil",
        "codigo_usuario",
        "nombre_perfil",
        "fecha_creacion",
      ]);
      const codigoPerfil = dataPerfil.codigo_perfil;
      const perfilExistente: Number = await this.getValidarPerfilExistente(
        codigoPerfil
      );

      if (perfilExistente === 0) {
        await Perfil.create(dataPerfil);
        response.status(200).json({ msg: "Registro de perfil completado" });
      } else {
        response
          .status(400)
          .json({ msg: "Error, el codigo perfil ya se encuentra registrado" });
      }
    } catch (error) {
      response.status(500).json({ msg: "Error en el servidor!" });
    }
  }

  public async actualizarPerfil({ request, response }: HttpContextContract) {
    try {
      const id = request.param("id");
      const profile = await Perfil.findOrFail(id);
      const data = request.all();

      profile.codigo_usuario = data.codigo_usuario;
      profile.nombre_perfil = data.nombre_perfil;
      profile.fecha_creacion = data.fecha_creacion;

      profile.save();
      return { msg: "Registro Actualizado" };
    } catch (error) {
      console.log(error);
      response.status(500).json({ msg: "Error en el servidor!" });
    }
  }

  public async eliminarPerfil({ request, response }: HttpContextContract) {
    try {
      const id = request.param("id");
      await Perfil.query().where("codigo_perfil", id).delete();
      return { msg: "Registro Actualizado" };
    } catch (error) {
      console.log(error);
      response.status(500).json({ msg: "Error en el servidor!" });
    }
  }

  public async listarPerfiles(): Promise<Perfil[]> {
    const profiles = await Perfil.all();
    return profiles;
  }
}
