export class Mensagem {

    constructor(private _texto: string = '') { }

    get texto() {

        return this._texto;
    }

    set texto(texto) {

        this._texto = texto;
    }
}