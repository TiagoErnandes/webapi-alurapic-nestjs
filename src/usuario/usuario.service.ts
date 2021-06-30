import { Injectable } from "@nestjs/common";
import { Usuario } from "./usuario.entity";

@Injectable()
export class UsuarioService {
  private usuarios: Array<Usuario> = [];  

  
  public cria(usuario:Usuario):Usuario{
    this.usuarios.push(usuario);
    return usuario;
  }

 
  public obterTodos(){
    return this.usuarios;
  }
  
  public buscaPorNomeDeUsuario(nome): Usuario{
    return this.usuarios.find(usuario=>usuario.nomeDeUsuario == nome)
  }

}