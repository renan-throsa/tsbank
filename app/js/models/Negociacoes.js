System.register([], function (exports_1, context_1) {
    "use strict";
    var Negociacoes;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Negociacoes = class Negociacoes {
                constructor() {
                    this._negociacoes = [];
                }
                ordena(criteria) {
                    this._negociacoes.sort(criteria);
                }
                contem(negociacao) {
                    return this._negociacoes
                        .some(negociacaoAtual => negociacaoAtual.ehIgual(negociacao));
                }
                adiciona(negociacao) {
                    this._negociacoes.push(negociacao);
                }
                paraArray() {
                    return [].concat(this._negociacoes);
                }
                esvazia() {
                    this._negociacoes = [];
                }
            };
            exports_1("Negociacoes", Negociacoes);
        }
    };
});
