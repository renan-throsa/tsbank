
const _stores = ['negociacoes'];
const _versao = 2;
const _dbNome = 'tsbanco';
let _conexao: IDBDatabase | null;
let _fecha: Function;

const _criaStores = (resultado: IDBDatabase) => {
    _stores.forEach(store => {
        if (resultado.objectStoreNames.contains(store)) {
            resultado.deleteObjectStore(store);
        }
        resultado.createObjectStore(store, { autoIncrement: true });
    })
}

export class ConexaoService {

    constructor() {
        throw new Error('Não é possíve criar instancias de ConexaoService.');
    }

    static getConexao(): Promise<unknown> {
        return new Promise((resolve, rejeita) => {
            let abreRequisicao = window.indexedDB.open(_dbNome, _versao);
            let alvo: IDBOpenDBRequest;
            abreRequisicao.onupgradeneeded = e => {
                alvo = e.target as IDBOpenDBRequest;
                _criaStores(alvo.result);
            }

            abreRequisicao.onsuccess = e => {
                alvo = e.target as IDBOpenDBRequest;
                if (!_conexao) {
                    _conexao = alvo.result;
                    _fecha = _conexao.close.bind(_conexao);
                    _conexao.close = function () {
                        throw new Error("Não é possível fechar a conexão diretamente.");
                    };
                }
                resolve(_conexao);
            }

            abreRequisicao.onerror = e => {
                alvo = e.target as IDBOpenDBRequest;
                rejeita(alvo.error?.name);
            }
        })

    }

    public static fechaConexao() {
        if (_conexao) {
            _fecha();
            _conexao = null;
        }
    }

};


