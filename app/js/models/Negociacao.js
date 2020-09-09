System.register([], function (exports_1, context_1) {
    "use strict";
    var Negociacao;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Negociacao = class Negociacao {
                constructor(_data, _quantidade, _valor) {
                    this._data = _data;
                    this._quantidade = _quantidade;
                    this._valor = _valor;
                }
                get data() {
                    return this._data;
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
                paraTexto() {
                    console.log('-- paraTexto --');
                    console.log(`Data: ${this.data}
            Quantidade: ${this.quantidade}, 
            Valor: ${this.valor}, 
            Volume: ${this.volume}`);
                }
            };
            exports_1("Negociacao", Negociacao);
        }
    };
});
