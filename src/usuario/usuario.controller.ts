import { NestResponseBuild } from './../core/http/nest-response-build';
import { NestResponse } from './../core/http/nest-response';
import { UsuarioService } from './usuario.service';
import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post } from "@nestjs/common";
import { Usuario } from './usuario.entity';

@Controller('users')
export class UsuarioController{
  
  constructor(private usuarioService:UsuarioService){

  }

  @Post()
  public cria(@Body() usuario:Usuario):NestResponse{  
    const usuarioCriado = this.usuarioService.cria(usuario);
    return new NestResponseBuild()
      .comStatus(HttpStatus.CREATED)
      .comHeaders({
        'Location': `/users/${usuarioCriado.nomeDeUsuario}`
      })
      .comBody(usuarioCriado)
      .build();
  //  res.status(HttpStatus.CREATED)
  //  .location(`/users/${usuarioCriado.nomeDeUsuario}`)
  //  .json(usuarioCriado)
    
  }
  @Get()
  public obterTodos():Array<Usuario>{
   return this.usuarioService.obterTodos();
  }  
  @Get(':nomeDeUsuario')
  public buscaPorNomeDeUsuario(@Param('nomeDeUsuario') nomeDeUsuario: string){
    const usuarioEncontrado = this.usuarioService.buscaPorNomeDeUsuario(nomeDeUsuario);
    if(!usuarioEncontrado){
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Usuário não encontrado.'
      });
    }
    return usuarioEncontrado;
  }

}