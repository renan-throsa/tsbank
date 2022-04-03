import { Negociacao } from "../models/index.js";

export interface IProxyNegociacao {
    ordena(criteria: SortingFunction): void
    adiciona(negociacao: Negociacao): void
    contem(negociacao: Negociacao): boolean
    esvazia(): void
    lista(): ReadonlyArray<Negociacao>
}

export interface SortingFunction {
    (a: any, b: any): number
}