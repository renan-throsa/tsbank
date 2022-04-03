import { instanciaAtual } from "../controllers/NegociacaoController.js";
import { DateHelper, IProxyNegociacao } from "../helpers/index.js";
import { View } from "./View.js";


export class NegociacoesView extends View<IProxyNegociacao> {

    constructor(seletor: string) {
        super(seletor);
        if (this._elemento) {
            this._elemento.addEventListener('click', function (evento: any) {
                if (evento.target.nodeName == 'TH') {
                    if (evento.target != null) {
                        let thNome = evento.target.textContent?.toLocaleLowerCase() as string;
                        instanciaAtual().ordena(thNome);
                    }
                }
            });
        }
    }

    protected template(model: IProxyNegociacao): string {
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
                `
        }).join('')}
                </tbody>
        
                <tfoot>
                </tfoot>
            </table>`;
    }
}
