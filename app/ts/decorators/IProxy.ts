import { Negociacao } from "../models/Negociacao";

export interface IProxy {
    adiciona(negociacao: Negociacao): void
    esvazia(): void
    paraArray(): Negociacao[]
}