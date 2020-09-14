interface IProxyNegociacao {
    ordena(criteria: SortingFunction): void
    adiciona(negociacao: Negociacao): void
    esvazia(): void
    paraArray(): Negociacao[]
}

interface SortingFunction {
    (a: any, b: any): number
}