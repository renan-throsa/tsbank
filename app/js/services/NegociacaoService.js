System.register(["../models/index"], function (exports_1, context_1) {
    "use strict";
    var index_1, NegociacaoService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            NegociacaoService = class NegociacaoService {
                constructor() {
                    this.URL = 'http://localhost:4000/';
                }
                obterNegociacoes(handler) {
                    return fetch(this.URL + 'negociacoes/semana')
                        .then(res => handler(res))
                        .then(res => res.json())
                        .then((dados) => dados.map(dado => new index_1.Negociacao(new Date(dado.data), dado.quantidade, dado.valor)))
                        .catch(err => { throw new Error(err); });
                }
                obterNegociacoesDaSemana(handler) {
                    return fetch(this.URL + 'negociacoes/semana')
                        .then(res => handler(res))
                        .then(res => res.json())
                        .then((dados) => dados.map(dado => new index_1.Negociacao(new Date(dado.data), dado.quantidade, dado.valor)))
                        .catch(err => { throw new Error(err); });
                }
                obterNegociacoesDaSemanaPassada(handler) {
                    return fetch(this.URL + 'negociacoes/anterior')
                        .then(res => handler(res))
                        .then(res => res.json())
                        .then((dados) => dados.map(dado => new index_1.Negociacao(new Date(dado.data), dado.quantidade, dado.valor)))
                        .catch(err => { throw new Error(err); });
                }
                obterNegociacoesDaRetrasada(handler) {
                    return fetch(this.URL + 'negociacoes/retrasada')
                        .then(res => handler(res))
                        .then(res => res.json())
                        .then((dados) => dados.map(dado => new index_1.Negociacao(new Date(dado.data), dado.quantidade, dado.valor)))
                        .catch(err => { throw new Error(err); });
                }
            };
            exports_1("NegociacaoService", NegociacaoService);
        }
    };
});
