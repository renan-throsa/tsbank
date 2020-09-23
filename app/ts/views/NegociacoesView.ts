import { instanciaAtual } from "../controllers/NegociacaoController";
import { DateHelper, IProxyNegociacao } from "../helpers/index";
import { View } from "./View";


export class NegociacoesView extends View<IProxyNegociacao> {

    constructor(seletor: string) {
        super(seletor);
        this._elemento.on("click", function (evento) {
            if (evento.target.nodeName == 'TH') {
                if (evento.target != null) {
                    let thNome = evento.target.textContent?.toLocaleLowerCase() as string;
                    instanciaAtual().ordena(thNome);
                }
            }
        });
    }

    template(model: IProxyNegociacao): string {
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
