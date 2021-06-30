import { TransformaRespostaInterceptor } from './core/http/transforma-interceptor';
import { FiltroDeExcecaoHttp } from './usuario/common/filtros/filtros-de-excecao-http';

import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { UsuarioModule } from './usuario/usuario.module';


@Module({
  imports: [UsuarioModule],
  controllers: [],
  providers: [
  {
    provide: APP_FILTER,
    useClass:FiltroDeExcecaoHttp
  },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    },{
      provide: APP_INTERCEPTOR,
      useClass: TransformaRespostaInterceptor
    }
  ],
})
export class AppModule {}
