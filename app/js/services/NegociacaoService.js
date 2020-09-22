System.register(["../dao/index", "../models/index", "./index"], function (exports_1, context_1) {
    "use strict";
    var index_1, index_2, index_3, NegociacaoService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (index_3_1) {
                index_3 = index_3_1;
            }
        ],
        execute: function () {
            NegociacaoService = class NegociacaoService {
                constructor() {
                    this.URL = 'http://localhost:4000/';
                }
                obterNegociacoesDaSemana(handler) {
                    return fetch(this.URL + 'negociacoes/semana')
                        .then(res => handler(res))
                        .then(res => res.json())
                        .then((dados) => dados.map(dado => new index_2.Negociacao(new Date(dado.data), dado.quantidade, dado.valor)))
                        .catch(err => { throw new Error(err); });
                }
                obterNegociacoesDaSemanaPassada(handler) {
                    return fetch(this.URL + 'negociacoes/anterior')
                        .then(res => handler(res))
                        .then(res => res.json())
                        .then((dados) => dados.map(dado => new index_2.Negociacao(new Date(dado.data), dado.quantidade, dado.valor)))
                        .catch(err => { throw new Error(err); });
                }
                obterNegociacoesDaRetrasada(handler) {
                    return fetch(this.URL + 'negociacoes/retrasada')
                        .then(res => handler(res))
                        .then(res => res.json())
                        .then((dados) => dados.map(dado => new index_2.Negociacao(new Date(dado.data), dado.quantidade, dado.valor)))
                        .catch(err => { throw new Error(err); });
                }
                cadastra(negociacao) {
                    return index_3.ConexaoService
                        .getConexao()
                        .then(conexao => new index_1.NegociacaoDao(conexao))
                        .then(dao => dao.adiciona(negociacao));
                }
                lista() {
                    return index_3.ConexaoService
                        .getConexao()
                        .then(conexao => new index_1.NegociacaoDao(conexao))
                        .then(dao => dao.listaTodos());
                }
                apagaTudo() {
                    return index_3.ConexaoService
                        .getConexao()
                        .then(conexao => new index_1.NegociacaoDao(conexao))
                        .then(dao => dao.apagaTodos());
                }
            };
            exports_1("NegociacaoService", NegociacaoService);
        }
    };
});
