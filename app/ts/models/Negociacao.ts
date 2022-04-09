export class Negociacao {

    constructor(private _data: Date, public readonly quantidade: number, public readonly valor: number) {      
        this._data = new Date(_data);
        this.quantidade = quantidade;
        this.valor = valor;
    }

    get volume() {
        return this.quantidade * this.valor;
    }

    get data() {
        return new Date(this._data);
    }

    ehIgual(negociacao: Negociacao) {
        return JSON.stringify(this) == JSON.stringify(negociacao)
    }

}