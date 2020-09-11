System.register([], function (exports_1, context_1) {
    "use strict";
    var Proxy;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Proxy = class Proxy {
                constructor(_list, _armadilha) {
                    this._list = _list;
                    this._armadilha = _armadilha;
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
            exports_1("Proxy", Proxy);
        }
    };
});
