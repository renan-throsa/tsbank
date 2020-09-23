System.register(["./controllers/NegociacaoController"], function (exports_1, context_1) {
    "use strict";
    var NegociacaoController_1, controller;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (NegociacaoController_1_1) {
                NegociacaoController_1 = NegociacaoController_1_1;
            }
        ],
        execute: function () {
            controller = NegociacaoController_1.instanciaAtual();
            $('.form').on("submit", controller.adiciona.bind(controller));
            $('#botao-importa').on("click", controller.importa.bind(controller));
            $('#botao-apaga').on("click", controller.apaga.bind(controller));
        }
    };
});
