class NegociacaoService {
    constructor() {
        this.URL = 'http://localhost:4000/';
    }
    obterNegociacoesDaSemana(handler) {
        return fetch(this.URL + 'negociacoes/semana')
            .then(res => handler(res))
            .then(res => res.json())
            .then((dados) => dados.map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor)))
            .catch(err => { throw new Error(err); });
    }
    obterNegociacoesDaSemanaPassada(handler) {
        return fetch(this.URL + 'negociacoes/anterior')
            .then(res => handler(res))
            .then(res => res.json())
            .then((dados) => dados.map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor)))
            .catch(err => { throw new Error(err); });
    }
    obterNegociacoesDaRetrasada(handler) {
        return fetch(this.URL + 'negociacoes/retrasada')
            .then(res => handler(res))
            .then(res => res.json())
            .then((dados) => dados.map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor)))
            .catch(err => { throw new Error(err); });
    }
}
