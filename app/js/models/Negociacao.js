System.register([], function (exports_1, context_1) {
    "use strict";
    var Negociacao;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Negociacao = class Negociacao {
                constructor(data, quantidade, valor) {
                    this._data = new Date(data.getTime());
                    this._quantidade = quantidade;
                    this._valor = valor;
                }
                get data() {
                    return new Date(this._data.getTime());
                }
                get quantidade() {
                    return this._quantidade;
                }
                get valor() {
                    return this._valor;
                }
                get volume() {
                    return this._quantidade * this._valor;
                }
                ehIgual(negociacao) {
                    return JSON.stringify(this) == JSON.stringify(negociacao);
                }
            };
            exports_1("Negociacao", Negociacao);
        }
    };
});
