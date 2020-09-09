import { Negociacao, Imprimivel } from './index'

export class Negociacoes implements Imprimivel {
    private _negociacoes: Array<Negociacao> = []

    adiciona(negociacao: Negociacao) {
        this._negociacoes.push(negociacao)
    }

    paraArray(): Negociacao[] {
        return ([] as Negociacao[]).concat(this._negociacoes);
    }

    paraTexto(): void {

        console.log('-- paraTexto --');
        console.log(JSON.stringify(this._negociacoes));
    }
}