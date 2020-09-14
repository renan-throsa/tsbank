class Negociacoes {

    ordena(criteria: SortingFunction) {
        this._negociacoes.sort(criteria);        
    }

    private _negociacoes: Array<Negociacao> = []


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