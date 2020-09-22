System.register([], function (exports_1, context_1) {
    "use strict";
    var _stores, _versao, _dbNome, _conexao, _fecha, _criaStores, ConexaoService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            _stores = ['negociacoes'];
            _versao = 2;
            _dbNome = 'tsbanco';
            _criaStores = (resultado) => {
                _stores.forEach(store => {
                    if (resultado.objectStoreNames.contains(store)) {
                        resultado.deleteObjectStore(store);
                    }
                    resultado.createObjectStore(store, { autoIncrement: true });
                });
            };
            ConexaoService = class ConexaoService {
                constructor() {
                    throw new Error('Não é possíve criar instancias de ConexaoService.');
                }
                static getConexao() {
                    return new Promise((resolve, rejeita) => {
                        let abreRequisicao = window.indexedDB.open(_dbNome, _versao);
                        let alvo;
                        abreRequisicao.onupgradeneeded = e => {
                            alvo = e.target;
                            _criaStores(alvo.result);
                        };
                        abreRequisicao.onsuccess = e => {
                            alvo = e.target;
                            if (!_conexao) {
                                _conexao = alvo.result;
                                _fecha = _conexao.close.bind(_conexao);
                                _conexao.close = function () {
                                    throw new Error("Não é possível fechar a conexão diretamente.");
                                };
                            }
                            resolve(_conexao);
                        };
                        abreRequisicao.onerror = e => {
                            var _a;
                            alvo = e.target;
                            rejeita((_a = alvo.error) === null || _a === void 0 ? void 0 : _a.name);
                        };
                    });
                }
                static fechaConexao() {
                    if (_conexao) {
                        _fecha();
                        _conexao = null;
                    }
                }
            };
            exports_1("ConexaoService", ConexaoService);
            ;
        }
    };
});
