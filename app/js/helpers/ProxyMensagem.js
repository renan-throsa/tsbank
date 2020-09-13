System.register([], function (exports_1, context_1) {
    "use strict";
    var ProxyMensagem;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            ProxyMensagem = class ProxyMensagem {
                constructor(_mensagem, _armadilha) {
                    this._mensagem = _mensagem;
                    this._armadilha = _armadilha;
                }
                getTexto() {
                    return this._mensagem.texto;
                }
                setTexto(texto) {
                    this._mensagem.texto = texto;
                    this._armadilha(this._mensagem);
                }
            };
            exports_1("ProxyMensagem", ProxyMensagem);
        }
    };
});
