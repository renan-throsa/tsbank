export class Negociacao {
    constructor(_data, quantidade, valor) {
        this._data = _data;
        this.quantidade = quantidade;
        this.valor = valor;
        this._data = new Date(_data.getTime());
        this.quantidade = quantidade;
        this.valor = valor;
    }
    get volume() {
        return this.quantidade * this.valor;
    }
    get data() {
        return new Date(this._data.getTime());
    }
    ehIgual(negociacao) {
        return JSON.stringify(this) == JSON.stringify(negociacao);
    }
}
