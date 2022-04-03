export class ProxyNegociacao {
    constructor(_list, _armadilha) {
        this._list = _list;
        this._armadilha = _armadilha;
        this._armadilha(this);
    }
    contem(negociacao) {
        return this._list.contem(negociacao);
    }
    ordena(criteria) {
        this._list.ordena(criteria);
        this._armadilha(this);
    }
    adiciona(negociacao) {
        this._list.adiciona(negociacao);
        this._armadilha(this);
    }
    esvazia() {
        this._list.esvazia();
        this._armadilha(this);
    }
    lista() {
        return this._list.lista();
    }
}
