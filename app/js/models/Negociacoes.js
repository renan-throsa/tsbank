class Negociacoes {
    constructor() {
        this._negociacoes = [];
    }
    ordena(criteria) {
        this._negociacoes.sort(criteria);
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
