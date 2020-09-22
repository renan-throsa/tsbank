System.register([], function (exports_1, context_1) {
    "use strict";
    var DateHelper;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            DateHelper = class DateHelper {
                constructor() {
                    throw new Error('Esta classe não pode ser instanciada');
                }
                static dataParaTexto(data) {
                    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
                }
                static textoParaData(texto) {
                    if (!/\d{4}-\d{2}-\d{2}/.test(texto))
                        throw new Error('Deve estar no formato aaaa-mm-dd');
                    return new Date(texto.replace(/-/g, ','));
                }
            };
            exports_1("DateHelper", DateHelper);
        }
    };
});
