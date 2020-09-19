class ConexaoService {
    constructor() {
        this._stores = ['negociacoes'];
        this._versao = 2;
        this._dbNome = 'tsbanco';
    }
    getConexao() {
        return new Promise((resolve, rejeita) => {
            let abreRequisicao = window.indexedDB.open(this._dbNome, this._versao);
            let alvo;
            abreRequisicao.onupgradeneeded = e => {
                alvo = e.target;
                this.criaStores(alvo.result);
            };
            abreRequisicao.onsuccess = e => {
                alvo = e.target;
                resolve(alvo.result);
            };
            abreRequisicao.onerror = e => {
                var _a;
                alvo = e.target;
                rejeita((_a = alvo.error) === null || _a === void 0 ? void 0 : _a.name);
            };
        });
    }
    criaStores(resultado) {
        this._stores.forEach(store => {
            if (resultado.objectStoreNames.contains(store)) {
                resultado.deleteObjectStore(store);
            }
            resultado.createObjectStore(store, { autoIncrement: true });
        });
    }
}
