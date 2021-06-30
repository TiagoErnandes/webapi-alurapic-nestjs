import { NestResponse } from './nest-response';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';

@Injectable()
export class TransformaRespostaInterceptor implements NestInterceptor {

  private httpAdapter: AbstractHttpAdapter;
  constructor (private adapterHost:HttpAdapterHost){
    this.httpAdapter = this.adapterHost.httpAdapter;
  }


  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle()
                .pipe(
                  map((respostaDoControlador:NestResponse) =>{
                    if(respostaDoControlador instanceof NestResponse){
                      const contexto = context.switchToHttp();
                      const response = contexto.getResponse();
                      const {headers,status,body} = respostaDoControlador;

                      const nomesDosCabecalhos = Object.getOwnPropertyNames(headers);
                      nomesDosCabecalhos.forEach(nomedocabecalho=>{
                        const valorDoCabecalho = headers[nomedocabecalho];
                        this.httpAdapter.setHeader(response,nomedocabecalho,valorDoCabecalho);
                      })
                      this.httpAdapter.status(response,status);

                      return body;
                    }
                    return respostaDoControlador;
                  })
                );
    throw new Error("Method not implemented.");
  }

}