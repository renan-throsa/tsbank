class Negociacoes {

    private _negociacoes: Array<Negociacao> = []

    ordena(criteria: SortingFunction) {
        this._negociacoes.sort(criteria);
    }

    contem(negociacao: Negociacao): boolean {
        return this._negociacoes
            .some(negociacaoAtual => negociacaoAtual.ehIgual(negociacao))
    }

    adiciona(negociacao: Negociacao) {
        this._negociacoes.push(negociacao)
    }

    paraArray(): Negociacao[] {
        return ([] as Negociacao[]).concat(this._negociacoes);
    }

    esvazia() {
        this._negociacoes = [];
    }

}