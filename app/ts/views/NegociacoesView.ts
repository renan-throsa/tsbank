import { View } from './View'
import { DateHelper } from '../helpers/index';
import { IProxyNegociacao } from '../helpers/IProxyNegociacao';

export class NegociacoesView extends View<IProxyNegociacao> {

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
