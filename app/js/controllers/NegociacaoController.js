System.register(["../views/index", "../models/index", "../decorators/index", "../helpers/index", "../services/index", "../decorators/Proxy"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var index_1, index_2, index_3, index_4, index_5, Proxy_1, NegociacaoController, DiaDaSemana;
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
            },
            function (Proxy_1_1) {
                Proxy_1 = Proxy_1_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._negociacoes = new Proxy_1.Proxy(new index_2.Negociacoes(), (model) => {
                        this._negociacoesView.update(model);
                    });
                    this._negociacoesView = new index_1.NegociacoesView('#negociacoesView');
                    this._negociacoesView.update(this._negociacoes);
                    this._mensagemView = new index_1.MensagemView('#mensagemView');
                    this._negociacaoService = new index_5.NegociacaoService();
                }
                adiciona(event) {
                    event.preventDefault();
                    let data = index_4.DateHelper.textoParaData(this._inputData.val());
                    if (!this._ehDiaUtil(data)) {
                        this._mensagemView.update('Somente negociações em dias úteis, por favor!');
                        return;
                    }
                    const negociacao = new index_2.Negociacao(data, parseInt(this._inputQuantidade.val()), parseFloat(this._inputValor.val()));
                    this._negociacoes.adiciona(negociacao);
                    this._mensagemView.update('Negociação adicionada com sucesso.');
                    this._limpaFormulario();
                }
                apaga() {
                    this._negociacoes.esvazia();
                    this._mensagemView.update('Negociações apagadas com sucesso.');
                }
                importarDados() {
                    function isOK(res) {
                        if (res.ok) {
                            return res;
                        }
                        else {
                            throw new Error(res.statusText);
                        }
                    }
                    this._negociacaoService.obterNegociacoes(isOK)
                        .then(negociacoes => {
                        negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
                    });
                }
                _ehDiaUtil(data) {
                    return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
                }
                _limpaFormulario() {
                    this._inputData.val("");
                    this._inputQuantidade.val(1);
                    this._inputValor.val(0);
                }
            };
            __decorate([
                index_3.domInject('#data')
            ], NegociacaoController.prototype, "_inputData", void 0);
            __decorate([
                index_3.domInject('#quantidade')
            ], NegociacaoController.prototype, "_inputQuantidade", void 0);
            __decorate([
                index_3.domInject('#valor')
            ], NegociacaoController.prototype, "_inputValor", void 0);
            __decorate([
                index_3.throttle()
            ], NegociacaoController.prototype, "importarDados", null);
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
