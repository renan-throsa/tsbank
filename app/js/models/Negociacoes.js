export class Negociacoes {
    constructor() {
        this._negociacoes = [];
    }
    ordena(criteria) {
        this._negociacoes.sort(criteria);
    }
    contem(negociacao) {
        return this._negociacoes
            .some(negociacaoAtual => negociacaoAtual.ehIgual(negociacao));
    }
    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }
    lista() {
        return this._negociacoes;
    }
    esvazia() {
        this._negociacoes = [];
    }
}
