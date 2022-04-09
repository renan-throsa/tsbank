import { NegociacaoDao } from "../dao/index.js";
import { Negociacao, NegociacaoParcial } from "../models/index.js";
import { ConexaoService } from "./index.js";

export class NegociacaoService {
    private readonly URL = 'http://localhost:4000/';

    obterNegociacoesDaSemana(handler: HandlerFunction): Promise<Negociacao[]> {
        return fetch(this.URL + 'negociacoes/semana')
            .then(res => handler(res))
            .then(res => res.json())
            .then((dados: NegociacaoParcial[]) =>
                dados.map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor))
            )
            .catch(err => { throw new Error(err) });

    }

    obterNegociacoesDaSemanaPassada(handler: HandlerFunction): Promise<Negociacao[]> {
        return fetch(this.URL + 'negociacoes/anterior')
            .then(res => handler(res))
            .then(res => res.json())
            .then((dados: NegociacaoParcial[]) =>
                dados.map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor))
            )
            .catch(err => { throw new Error(err) });

    }

    obterNegociacoesDaRetrasada(handler: HandlerFunction): Promise<Negociacao[]> {
        return fetch(this.URL + 'negociacoes/retrasada')
            .then(res => handler(res))
            .then(res => res.json())
            .then((dados: NegociacaoParcial[]) =>
                dados.map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor))
            )
            .catch(err => { throw new Error(err) });

    }

    cadastra(negociacao: Negociacao): Promise<string> {
        return ConexaoService
            .getConexao()
            .then(conexao => new NegociacaoDao(conexao as IDBDatabase))
            .then(dao => dao.adiciona(negociacao))
    }

    lista() {        
        return ConexaoService
            .getConexao()
            .then(conexao => new NegociacaoDao(conexao as IDBDatabase))
            .then(dao => dao.listaTodos())
    }

    apagaTudo() {
        return ConexaoService
            .getConexao()
            .then(conexao => new NegociacaoDao(conexao as IDBDatabase))
            .then(dao => dao.apagaTodos())

    }
}

export interface HandlerFunction {
    (res: Response): Response
}