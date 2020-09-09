import { View } from './View'
import { Negociacoes } from '../models/Negociacoes'
import { DateHelper } from '../helpers/index';

export class NegociacoesView extends View<Negociacoes> {

    template(model: Negociacoes): string {
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
