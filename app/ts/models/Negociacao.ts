import { Imprimivel } from './Imprimivel'

export class Negociacao implements Imprimivel {

    constructor(
        private _data: Date,
        private _quantidade: number,
        private _valor: number) {
    }

    get data() {

        return this._data;

    }

    get quantidade() {

        return this._quantidade;

    }

    get valor() {

        return this._valor;
    }

    get volume() {

        return this._quantidade * this._valor;
    }

    paraTexto(): void {
        console.log('-- paraTexto --');
        console.log(
            `Data: ${this.data}
            Quantidade: ${this.quantidade}, 
            Valor: ${this.valor}, 
            Volume: ${this.volume}`
        );
    }
}