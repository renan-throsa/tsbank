export class Mensagem {
    constructor(_texto = '') {
        this._texto = _texto;
    }
    get texto() {
        return this._texto;
    }
    set texto(texto) {
        this._texto = texto;
    }
}
