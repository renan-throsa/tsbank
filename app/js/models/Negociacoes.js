class Negociacoes {
    constructor() {
        this._negociacoes = [];
    }
    ordena(criteria) {
        this._negociacoes.sort(criteria);
    }
    contem(negociacao) {
        return this._negociacoes
            .some(negociacaoAtual => JSON.stringify(negociacaoAtual) == JSON.stringify(negociacao));
    }
    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }
    paraArray() {
        return [].concat(this._negociacoes);
    }
    esvazia() {
        this._negociacoes = [];
    }
}
