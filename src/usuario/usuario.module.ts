import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { IsUserAlreadyExistConstraint } from './is-nome-de-usuario-valitador';


@Module({
  controllers:[UsuarioController],
  providers:[UsuarioService,IsUserAlreadyExistConstraint]
})

export class UsuarioModule {}