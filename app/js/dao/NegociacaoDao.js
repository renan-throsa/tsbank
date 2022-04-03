import { Negociacao } from "../models/index.js";
export class NegociacaoDao {
    constructor(_conexao) {
        this._conexao = _conexao;
        this._store = 'negociacoes';
    }
    adiciona(negociacao) {
        return new Promise((resolve, rejeita) => {
            let requisicao = this._conexao
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao);
            requisicao.onsuccess = e => {
                resolve("Negociação adicionada com sucesso.");
            };
            requisicao.onerror = e => {
                let alvo = e.target;
                console.log(alvo.error);
                rejeita('Não foi possível adicionar a negociação.');
            };
        });
    }
    listaTodos() {
        return new Promise((resolve, rejeita) => {
            let cursor = this._conexao.
                transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();
            let negociacoes = [];
            cursor.onsuccess = e => {
                let alvo = e.target;
                let atual = alvo.result;
                if (atual) {
                    let dado = atual.value;
                    negociacoes.push(new Negociacao(dado.data, dado.quantidade, dado.valor));
                    atual.continue();
                }
                else {
                    resolve(negociacoes);
                }
            };
            cursor.onerror = e => {
                let alvo = e.target;
                console.log(alvo.error);
                rejeita('Não foi possível listar as negociações');
            };
        });
    }
    apagaTodos() {
        return new Promise((resolve, rejeita) => {
            let requisicao = this._conexao
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();
            requisicao.onsuccess = e => {
                resolve("Negociações apagadas com sucesso.");
            };
            requisicao.onerror = e => {
                let alvo = e.target;
                console.log(alvo.error);
                rejeita('Não foi possível apagar as negociações');
            };
        });
    }
}
