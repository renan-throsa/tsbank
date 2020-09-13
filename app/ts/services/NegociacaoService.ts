import { NegociacaoParcial, Negociacao } from '../models/index';

export class NegociacaoService {
    private readonly URL = 'http://localhost:4000/';

    obterNegociacoes(handler: HandlerFunction): Promise<Negociacao[]> {
        return fetch(this.URL + 'negociacoes/semana')
            .then(res => handler(res))
            .then(res => res.json())
            .then((dados: NegociacaoParcial[]) =>
                dados.map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor))
            )
            .catch(err => { throw new Error(err) });

    }

    obterNegociacoesDaSemana(handler: HandlerFunction): Promise<Negociacao[]> {
        return fetch(this.URL + 'negociacoes/semana')
            .then(res => handler(res))
            .then(res => res.json())
            .then((dados: NegociacaoParcial[]) =>
                dados.map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor))
            )
            .catch(err => { throw new Error(err) });

    }

    obterNegociacoesDaSemanaPassada(handler: HandlerFunction): Promise<Negociacao[]> {
        return fetch(this.URL + 'negociacoes/anterior')
            .then(res => handler(res))
            .then(res => res.json())
            .then((dados: NegociacaoParcial[]) =>
                dados.map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor))
            )
            .catch(err => { throw new Error(err) });

    }

    obterNegociacoesDaRetrasada(handler: HandlerFunction): Promise<Negociacao[]> {
        return fetch(this.URL + 'negociacoes/retrasada')
            .then(res => handler(res))
            .then(res => res.json())
            .then((dados: NegociacaoParcial[]) =>
                dados.map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor))
            )
            .catch(err => { throw new Error(err) });

    }
}

export interface HandlerFunction {
    (res: Response): Response
}