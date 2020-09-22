import { DateHelper } from "../helpers/DateHelper";
import { View } from "./View";
export class NegociacoesView extends View {
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
