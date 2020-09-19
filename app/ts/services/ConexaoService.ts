class ConexaoService {

    private readonly _stores = ['negociacoes'];
    private readonly _versao = 2;
    private readonly _dbNome = 'tsbanco';


    public getConexao() {
        return new Promise((resolve, rejeita) => {
            let abreRequisicao = window.indexedDB.open(this._dbNome, this._versao);
            let alvo: IDBOpenDBRequest;
            abreRequisicao.onupgradeneeded = e => {
                alvo = e.target as IDBOpenDBRequest;
                this.criaStores(alvo.result);
            }

            abreRequisicao.onsuccess = e => {
                alvo = e.target as IDBOpenDBRequest;
                resolve(alvo.result);
            }

            abreRequisicao.onerror = e => {
                alvo = e.target as IDBOpenDBRequest;
                rejeita(alvo.error?.name);
            }
        })

    }

    private criaStores(resultado: IDBDatabase) {
        this._stores.forEach(store => {
            if (resultado.objectStoreNames.contains(store)) {
                resultado.deleteObjectStore(store);
            }
            resultado.createObjectStore(store, { autoIncrement: true });
        })
    }

}
