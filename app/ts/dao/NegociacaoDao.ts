import { Negociacao } from "../models/index";

export class NegociacaoDao {

    private _store: string;

    constructor(private _conexao: IDBDatabase) {
        this._store = 'negociacoes';
    }

    public adiciona(negociacao: Negociacao): Promise<string> {
        return new Promise((resolve, rejeita) => {
            let requisicao = this._conexao
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao);

            requisicao.onsuccess = e => {
                resolve("Negociação adicionada com sucesso.");
            }

            requisicao.onerror = e => {
                let alvo = e.target as IDBOpenDBRequest;
                console.log(alvo.error);
                rejeita('Não foi possível adicionar a negociação.');
            }
        })
    }

    public listaTodos(): Promise<Array<Negociacao>> {
        return new Promise((resolve, rejeita) => {
            let cursor = this._conexao.
                transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            let negociacoes: Array<Negociacao> = [];

            cursor.onsuccess = e => {
                let alvo = e.target as IDBOpenDBRequest
                let atual: any = alvo.result;
                if (atual) {
                    let dado = atual.value
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                    atual.continue();
                } else {
                    resolve(negociacoes);
                }
            }

            cursor.onerror = e => {
                let alvo = e.target as IDBOpenDBRequest;
                console.log(alvo.error);
                rejeita('Não foi possível listar as negociações');
            }
        })
    }

    public apagaTodos(): Promise<string> {
        return new Promise((resolve, rejeita) => {
            let requisicao = this._conexao
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();

            requisicao.onsuccess = e => {
                resolve("Negociações apagadas com sucesso.");
            }

            requisicao.onerror = e => {
                let alvo = e.target as IDBOpenDBRequest;
                console.log(alvo.error);
                rejeita('Não foi possível apagar as negociações');
            }
        });
    }
}