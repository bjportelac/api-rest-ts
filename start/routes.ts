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

Route.group(() => {

  //Usuarios
    //Read
    Route.get('/listar-usuarios','UsuariosController.getListarUsuarios')
    Route.get('/listar-todo','UsuariosController.getListarUsuariosTodos')
    Route.get('/listar-perfil','UsuariosController.getListarUsuariosYPerfil')
    Route.get('/listar-publicaciones','UsuariosController.getListarUsuariosYPublicacion')
    Route.get('/listar-usuarios-grupos','UsuariosController.getListarUsuariosGrupos')
    Route.get('/buscar-id/:id','UsuariosController.buscarPorId')
    Route.get('/buscar-nombre','UsuariosController.filtroPorNombre')
    //Create
    Route.post('/registro-usuarios','UsuariosController.setRegistrarUsuarios')
    //Delete
    Route.delete('/eliminar-usuario/:id','UsuariosController.eliminarUsuario')
    //Update
    Route.put('/actualizar-usuario/:id','UsuariosController.actualizarUsuario')

  //Grupos
    //Create
    Route.post('/registro-grupo','GruposController.setRegistrarGrupo')
    //Read
    Route.get('/listar-grupos','GruposController.listarGrupos')
    Route.get('/filtro-nom-grupo','GruposController.filtroPorNombre')
    //Update
    Route.put('/actualizar-grupo/:id','GruposController.actualizarGrupo')
    //Delete
    Route.delete('/eliminar-grupo/:id','GruposController.eliminarGrupo')

  //Perfiles
    //Create
    Route.post('/registro-perfil','PerfilsController.setRegistrarPerfil')
    //Read
    Route.get('/listar-perfiles','PerfilsController.listarPerfiles')
    //Update
    Route.put('/actualizar-perfil/:id','PerfilsController.actualizarPerfil')
    //Delete
    Route.delete('/eliminar-perfil/:id','PerfilsController.eliminarPerfil')

  
  //Grupos
    //Create
    Route.post('/registro-publicacion','PublicacionesController.setRegistrarPublicacion')
    //Read
    Route.get("/publicaciones/:id","PublicacionesController.publicacionPorUsuario")
    //Update
    Route.put("/actualizar-publicacion/:id","PublicacionesController.actualizarPublicacion")
    //Delete
    Route.delete("/eliminar-publicacion/:id","PublicacionesController.eliminarPublicacion")

    
    Route.post('/registro-usuario-grupo','GrupoUsuariosController.setRegistrarUsuarioGrupo')

}).prefix('/api')
