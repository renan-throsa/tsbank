import { Mensagem } from "../models/index.js";
import { IProxyMensagem } from "./index.js";

export class ProxyMensagem implements IProxyMensagem {

    constructor(private _mensagem: Mensagem, private _armadilha: Function) { }

    getTexto(): string {

        return this._mensagem.texto;
    }

    setTexto(texto: string) {

        this._mensagem.texto = texto;
        this._armadilha(this._mensagem);
    }


}