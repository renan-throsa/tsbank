System.register(["../models/index"], function (exports_1, context_1) {
    "use strict";
    var index_1, NegociacaoDao;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            NegociacaoDao = class NegociacaoDao {
                constructor(_conexao) {
                    this._conexao = _conexao;
                    this._store = 'negociacoes';
                }
                adiciona(negociacao) {
                    return new Promise((resolve, rejeita) => {
                        let requisicao = this._conexao
                            .transaction([this._store], 'readwrite')
                            .objectStore(this._store)
                            .add(negociacao);
                        requisicao.onsuccess = e => {
                            resolve("Negociação adicionada com sucesso.");
                        };
                        requisicao.onerror = e => {
                            let alvo = e.target;
                            console.log(alvo.error);
                            rejeita('Não foi possível adicionar a negociação.');
                        };
                    });
                }
                listaTodos() {
                    return new Promise((resolve, rejeita) => {
                        let cursor = this._conexao.
                            transaction([this._store], 'readwrite')
                            .objectStore(this._store)
                            .openCursor();
                        let negociacoes = [];
                        cursor.onsuccess = e => {
                            let alvo = e.target;
                            let atual = alvo.result;
                            if (atual) {
                                let dado = atual.value;
                                negociacoes.push(new index_1.Negociacao(dado._data, dado._quantidade, dado._valor));
                                atual.continue();
                            }
                            else {
                                resolve(negociacoes);
                            }
                        };
                        cursor.onerror = e => {
                            let alvo = e.target;
                            console.log(alvo.error);
                            rejeita('Não foi possível listar as negociações');
                        };
                    });
                }
                apagaTodos() {
                    return new Promise((resolve, rejeita) => {
                        let requisicao = this._conexao
                            .transaction([this._store], 'readwrite')
                            .objectStore(this._store)
                            .clear();
                        requisicao.onsuccess = e => {
                            resolve("Negociações apagadas com sucesso.");
                        };
                        requisicao.onerror = e => {
                            let alvo = e.target;
                            console.log(alvo.error);
                            rejeita('Não foi possível apagar as negociações');
                        };
                    });
                }
            };
            exports_1("NegociacaoDao", NegociacaoDao);
        }
    };
});
