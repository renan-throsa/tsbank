import { Negociacao, Negociacoes } from "../models/index";
import { IProxy } from "./IProxy";

export class Proxy implements IProxy {

    constructor(private _list: Negociacoes, private _armadilha: Function) { }

    public adiciona(negociacao: Negociacao): void {
        this._list.adiciona(negociacao)
        this._armadilha(this)
    }
    public esvazia(): void {
        this._list.esvazia();
        this._armadilha(this)
    }

    paraArray(): Negociacao[] {
        return this._list.paraArray();
    }

}