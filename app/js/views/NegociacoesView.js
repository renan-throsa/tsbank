System.register(["../helpers/index", "./View"], function (exports_1, context_1) {
    "use strict";
    var index_1, View_1, NegociacoesView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (View_1_1) {
                View_1 = View_1_1;
            }
        ],
        execute: function () {
            NegociacoesView = class NegociacoesView extends View_1.View {
                template(model) {
                    return `        
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th onclick="controller.ordena('data')" >DATA</th>
                        <th onclick="controller.ordena('quantidade')" >QUANTIDADE</th>
                        <th onclick="controller.ordena('valor')" >VALOR</th>
                        <th onclick="controller.ordena('volume')" >VOLUME</th>
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
