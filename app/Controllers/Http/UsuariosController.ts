import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Usuario from "App/Models/Usuario";

export default class UsuariosController {
  public async getListarUsuarios(): Promise<Usuario[]> {
    const user = await Usuario.all();
    return user;
  }

  public async getListarUsuariosYPerfil(): Promise<Usuario[]> {
    const user = await Usuario.query().preload("perfil");
    return user;
  }

  public async getListarUsuariosYPublicacion(): Promise<Usuario[]> {
    const user = await Usuario.query().preload("usuario_grupos");
    return user;
  }

  public async getListarUsuariosGrupos(): Promise<Usuario[]> {
    const user = await Usuario.query().preload("usuario_grupos");
    return user;
  }

  private async getValidarUsuarioExistente(
    codigo_usuario: Number
  ): Promise<Number> {
    const total = await Usuario.query()
      .where({ codigo_usuario: codigo_usuario })
      .count("*")
      .from("usuarios");
    return parseInt(total[0]["count(*)"]);
  }

  public async setRegistrarUsuarios({
    request,
    response,
  }: HttpContextContract) {
    const dataUsuario = request.only([
      "codigo_usuario",
      "nombre_usuario",
      "contraseña",
      "email",
      "telefono",
      "perfil",
    ]);

    try {
      const codigoUsuario = dataUsuario.codigo_usuario;
      const usuarioExistente: Number = await this.getValidarUsuarioExistente(
        codigoUsuario
      );

      if (usuarioExistente === 0) {
        await Usuario.create(dataUsuario);
        response.status(200).json({ msg: "Registro completado con exito" });
      } else {
        response.status(400).json({
          msg: "Error, el codigo de usuario ya se encuentra registrado",
        });
      }
    } catch (error) {
      console.log(error);
      response.status(500).json({ msg: "Error en el servidor!" });
    }
  }

  //Funcion SearchById
  public async buscarPorId({ request }: HttpContextContract) {
    const id = request.param("id");
    const user = await Usuario.find(id);
    return user;
  }

  //Funcion Actualizar
  public async actualizarUsuario({ request }: HttpContextContract) {
    // const id = request.param("id");
    // const user = request.all(); //All[todo lo del body] Only[Solo los metodos especificados]

    // await Usuario.query().where("codigo_usuario", id).update({
    //   nombre_usuario: user.nombre_usuario,
    //   contraseña: user.contraseña,
    //   email: user.email,
    //   telefono: user.telefono,
    // });
    // return { msg: "Registro Actualizado" };

    const id = request.param("id");
    const usuario = await Usuario.findOrFail(id);
    const datos = request.all(); //All[todo lo del body] Only[Solo los metodos especificados]

    usuario.nombre_usuario = datos.nombre_usuario;
    usuario.contrasena = datos.contraseña;
    usuario.email = datos.email;
    usuario.telefono = datos.telefono;

    usuario.save();
    return { msg: "Registro Actualizado" };
  }

  //Eliminar
  public async eliminarUsuario({ request }: HttpContextContract) {
    const id = request.param("id");
    await Usuario.query().where("codigo_usuario", id).delete();
    return { msg: "Registro Eliminado" };
  }

  //busqueda con filtro
  public async filtroPorNombre({ request }: HttpContextContract) {
    const { nom } = request.all(); //Desestrucutracion
    const users = await Usuario.query().where(
      "nombre_usuario",
      "like",
      `${nom}%`
    );
    return users;
  }
}
