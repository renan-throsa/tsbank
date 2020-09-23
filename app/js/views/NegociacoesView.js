System.register(["../controllers/NegociacaoController", "../helpers/index", "./View"], function (exports_1, context_1) {
    "use strict";
    var NegociacaoController_1, index_1, View_1, NegociacoesView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (NegociacaoController_1_1) {
                NegociacaoController_1 = NegociacaoController_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (View_1_1) {
                View_1 = View_1_1;
            }
        ],
        execute: function () {
            NegociacoesView = class NegociacoesView extends View_1.View {
                constructor(seletor) {
                    super(seletor);
                    this._elemento.on("click", function (evento) {
                        var _a;
                        if (evento.target.nodeName == 'TH') {
                            if (evento.target != null) {
                                let thNome = (_a = evento.target.textContent) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase();
                                NegociacaoController_1.instanciaAtual().ordena(thNome);
                            }
                        }
                    });
                }
                template(model) {
                    return `        
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>
        
                <tbody>
                ${model.paraArray().map(n => {
                        return `                <tr>
                            <td>${index_1.DateHelper.dataParaTexto(n.data)}</td>
                        <td>${n.quantidade}</td>
                        <td>${n.valor}</td>
                        <td>${n.volume}</td>
                    </tr>
                `;
                    }).join('')}
                </tbody>
        
                <tfoot>
                </tfoot>
            </table>`;
                }
            };
            exports_1("NegociacoesView", NegociacoesView);
        }
    };
});
