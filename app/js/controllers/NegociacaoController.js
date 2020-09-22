System.register(["../decorators/index", "../models/index", "../services/index", "../views/index", "../helpers/index"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var index_1, index_2, index_3, index_4, index_5, NegociacaoController, DiaDaSemana;
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
            },
            function (index_4_1) {
                index_4 = index_4_1;
            },
            function (index_5_1) {
                index_5 = index_5_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._ordemAtual = '';
                    this._negociacaoService = new index_3.NegociacaoService();
                    this._negociacoesView = new index_4.NegociacoesView('#negociacoesView');
                    this._negociacoes = new index_5.ProxyNegociacao(new index_2.Negociacoes(), (model) => { this._negociacoesView.update(model); });
                    this._mensagemView = new index_4.MensagemView('#mensagemView');
                    this._mensagem = new index_5.ProxyMensagem(new index_2.Mensagem(), (model) => { this._mensagemView.update(model); });
                    this._negociacaoService
                        .lista()
                        .then(negociacoes => {
                        negociacoes.forEach(negociacao => {
                            this._negociacoes.adiciona(negociacao);
                        });
                    });
                }
                adiciona(event) {
                    event.preventDefault();
                    let negociacao = this._criaNegociacao();
                    if (negociacao) {
                        this._negociacaoService
                            .cadastra(negociacao)
                            .then(memsagem => {
                            this._negociacoes.adiciona(negociacao);
                            this._mensagem.setTexto(memsagem);
                            this._limpaFormulario();
                        });
                    }
                }
                apaga() {
                    this._negociacaoService
                        .apagaTudo()
                        .then(memsagem => {
                        this._mensagem.setTexto(memsagem);
                        this._negociacoes.esvazia();
                    });
                }
                ordena(coluna) {
                    if (this._ordemAtual == coluna) {
                        this._negociacoes.ordena(function (a, b) {
                            return b[coluna] - a[coluna];
                        });
                    }
                    else {
                        this._negociacoes.ordena(function (a, b) {
                            return a[coluna] - b[coluna];
                        });
                    }
                    this._ordemAtual = coluna;
                }
                importa() {
                    function isOK(res) {
                        if (res.ok) {
                            return res;
                        }
                        else {
                            throw new Error(res.statusText);
                        }
                    }
                    Promise.all([
                        this._negociacaoService.obterNegociacoesDaSemana(isOK),
                        this._negociacaoService.obterNegociacoesDaSemanaPassada(isOK),
                        this._negociacaoService.obterNegociacoesDaRetrasada(isOK)
                    ]).then(negociacoes => {
                        return negociacoes
                            .reduce((accumulator, currentValue) => accumulator.concat(currentValue));
                    }).then(negociacoes => {
                        return negociacoes
                            .filter(negociacao => !this._negociacoes.contem(negociacao));
                    }).then(negociacoes => {
                        negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
                        this._mensagem.setTexto("Negociações importadas com sucesso.");
                    });
                }
                _criaNegociacao() {
                    let data = index_5.DateHelper.textoParaData(this._inputData.val());
                    if (!this._ehDiaUtil(data)) {
                        this._mensagem.setTexto('Somente negociações em dias úteis, por favor!');
                        return null;
                    }
                    else {
                        const negociacao = new index_2.Negociacao(data, parseInt(this._inputQuantidade.val()), parseFloat(this._inputValor.val()));
                        return negociacao;
                    }
                }
                _ehDiaUtil(data) {
                    return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
                }
                _limpaFormulario() {
                    this._inputData.val("");
                    this._inputQuantidade.val(1);
                    this._inputValor.val(0.0);
                }
            };
            __decorate([
                index_1.domInject('#data')
            ], NegociacaoController.prototype, "_inputData", void 0);
            __decorate([
                index_1.domInject('#quantidade')
            ], NegociacaoController.prototype, "_inputQuantidade", void 0);
            __decorate([
                index_1.domInject('#valor')
            ], NegociacaoController.prototype, "_inputValor", void 0);
            __decorate([
                index_1.throttle()
            ], NegociacaoController.prototype, "importa", null);
            exports_1("NegociacaoController", NegociacaoController);
            (function (DiaDaSemana) {
                DiaDaSemana[DiaDaSemana["Domingo"] = 0] = "Domingo";
                DiaDaSemana[DiaDaSemana["Segunda"] = 1] = "Segunda";
                DiaDaSemana[DiaDaSemana["Terca"] = 2] = "Terca";
                DiaDaSemana[DiaDaSemana["Quarta"] = 3] = "Quarta";
                DiaDaSemana[DiaDaSemana["Quinta"] = 4] = "Quinta";
                DiaDaSemana[DiaDaSemana["Sexta"] = 5] = "Sexta";
                DiaDaSemana[DiaDaSemana["Sabado"] = 6] = "Sabado";
            })(DiaDaSemana || (DiaDaSemana = {}));
        }
    };
});
