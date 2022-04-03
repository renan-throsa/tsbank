export class ProxyMensagem {
    constructor(_mensagem, _armadilha) {
        this._mensagem = _mensagem;
        this._armadilha = _armadilha;
    }
    getTexto() {
        return this._mensagem.texto;
    }
    setTexto(texto) {
        this._mensagem.texto = texto;
        this._armadilha(this._mensagem);
    }
}
