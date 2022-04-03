import { instanciaAtual } from "../controllers/NegociacaoController.js";
import { DateHelper } from "../helpers/index.js";
import { View } from "./View.js";
export class NegociacoesView extends View {
    constructor(seletor) {
        super(seletor);
        if (this._elemento) {
            this._elemento.addEventListener('click', function (evento) {
                var _a;
                if (evento.target.nodeName == 'TH') {
                    if (evento.target != null) {
                        let thNome = (_a = evento.target.textContent) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase();
                        instanciaAtual().ordena(thNome);
                    }
                }
            });
        }
    }
    template(model) {
        return `        
            <table>
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>
        
                <tbody>
                ${model.lista().map(n => {
            return `<tr>
                        <td>${DateHelper.dataParaTexto(n.data)}</td>
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
}
