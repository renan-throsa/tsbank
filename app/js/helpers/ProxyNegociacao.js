System.register([], function (exports_1, context_1) {
    "use strict";
    var ProxyNegociacao;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            ProxyNegociacao = class ProxyNegociacao {
                constructor(_list, _armadilha) {
                    this._list = _list;
                    this._armadilha = _armadilha;
                    this._armadilha(this);
                }
                contem(negociacao) {
                    return this._list.contem(negociacao);
                }
                ordena(criteria) {
                    this._list.ordena(criteria);
                    this._armadilha(this);
                }
                adiciona(negociacao) {
                    this._list.adiciona(negociacao);
                    this._armadilha(this);
                }
                esvazia() {
                    this._list.esvazia();
                    this._armadilha(this);
                }
                paraArray() {
                    return this._list.paraArray();
                }
            };
            exports_1("ProxyNegociacao", ProxyNegociacao);
        }
    };
});
