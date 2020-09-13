import { Negociacao } from "../models/Negociacao";

export interface IProxyNegociacao {
    adiciona(negociacao: Negociacao): void
    esvazia(): void
    paraArray(): Negociacao[]
}