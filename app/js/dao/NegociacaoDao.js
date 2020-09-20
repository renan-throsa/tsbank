class NegociacaoDao {
    constructor(_conexao) {
        this._conexao = _conexao;
        this._store = 'negociacoes';
    }
    adiciona(negociacao) {
        return new Promise((resolve, rejeita) => {
            let transacao = this._conexao.transaction([this._store], 'readwrite');
            let store = transacao.objectStore(this._store);
            let requisicao = store.add(negociacao);
            requisicao.onsuccess = e => {
                resolve();
            };
            requisicao.onerror = e => {
                let alvo = e.target;
                console.log(alvo.error);
                rejeita('Não foi possível adicionar a negociação');
            };
        });
    }
    lista() {
        return new Promise((resolve, rejeita) => {
            let transacao = this._conexao.transaction([this._store], 'readwrite');
            let store = transacao.objectStore(this._store);
            let cursor = store.openCursor();
            let negociacoes = [];
            cursor.onsuccess = e => {
                let alvo = e.target;
                let atual = alvo.result;
                if (atual) {
                    let dado = atual.value;
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
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
}
