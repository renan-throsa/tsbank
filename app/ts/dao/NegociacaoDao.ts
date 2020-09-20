class NegociacaoDao {

    private _store: string;

    constructor(private _conexao: IDBDatabase) {
        this._store = 'negociacoes';
    }

    public adiciona(negociacao: Negociacao): Promise<void> {
        return new Promise((resolve, rejeita) => {
            let transacao = this._conexao.transaction([this._store], 'readwrite');
            let store = transacao.objectStore(this._store);
            let requisicao = store.add(negociacao);

            requisicao.onsuccess = e => {
                resolve();
            }

            requisicao.onerror = e => {
                let alvo = e.target as IDBOpenDBRequest;
                console.log(alvo.error);
                rejeita('Não foi possível adicionar a negociação');
            }
        })
    }

    public lista(): Promise<Array<Negociacao>> {
        return new Promise((resolve, rejeita) => {
            let transacao = this._conexao.transaction([this._store], 'readwrite');
            let store = transacao.objectStore(this._store);
            let cursor = store.openCursor();

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
}