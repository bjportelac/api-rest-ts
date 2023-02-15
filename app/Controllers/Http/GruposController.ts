import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Grupo from "App/Models/Grupo";

export default class GruposController {
  private async getValidarGrupoExistente(codigo_grupo: Number): Promise<Number> {
    const total = await Grupo.query()
      .where({ codigo_grupo: codigo_grupo })
      .count("*")
      .from("grupos");
    return parseInt(total[0]["count(*)"]);
  }

  public async setRegistrarGrupo({ request, response }: HttpContextContract) {
    try {
      const dataGrupo = request.only(["codigo_grupo", "nombre_grupo"]);
      const codigoGrupo = dataGrupo.codigo_grupo;
      const codigoGrupoExistente = await this.getValidarGrupoExistente(
        codigoGrupo
      );
      if (codigoGrupoExistente === 0) {
        await Grupo.create(dataGrupo);
        response.status(200).json({ msg: "Grupo registrado con exito" });
      } else {
        console.log(response)
        response
          .status(400)
          .json({ msg: "codigo del grupo ya se encuentra registrado!" });
      }
    } catch (error) {
      console.log(error);
      response.status(500).json({ msg: "Error en el servidor!" });
    }
  }

  public async actualizarGrupo({ request, response }: HttpContextContract) {
    try {
      const id = request.param("id");
      const grupo = await Grupo.findOrFail(id);
      const datos = request.all();

      grupo.nombre_grupo = datos.nombre_grupo;
      grupo.save();
      return { msg: "Registro Actualizado" };
    } catch (error) {
      console.log(error);
      response.status(500).json({ msg: "Error en el servidor!" });
    }
  }

  public async eliminarGrupo({ request, response }: HttpContextContract) {
    try {
      const id = request.param("id");
      await Grupo.query().where("codigo_grupo", id).delete();
      return { msg: "Registro Eliminado" };
    } catch (error) {
      console.log(error);
      response.status(500).json({ msg: "Error en el servidor!" });
    }
  }

  public async filtroPorNombre({ request, response }: HttpContextContract) {
    try {
      const { nom } = request.all();
      const groups = await Grupo.query().where(
        "nombre_grupo",
        "like",
        `${nom}%`
      );

      return groups;
    } catch (error) {
      console.log(error);
      response.status(500).json({ msg: "Error en el servidor!" });
    }
  }

  public async listarGrupos(): Promise<Grupo[]> {
    const groups = await Grupo.all();
    return groups;
  }
}
