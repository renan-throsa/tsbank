class ProxyNegociacao {
    constructor(_list, _armadilha) {
        this._list = _list;
        this._armadilha = _armadilha;
        this._armadilha(this);
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
    paraArray() {
        return this._list.paraArray();
    }
}
