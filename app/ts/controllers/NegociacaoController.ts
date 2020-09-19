//npm install @types/jquery@3.3.36 "typescript": "^3.7.5"
// https://libraries.io/npm/@types%2Fjquery/3.3.36

class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery;
    @domInject('#quantidade')
    private _inputQuantidade: JQuery;
    @domInject('#valor')
    private _inputValor: JQuery;
    private _negociacoes: IProxyNegociacao;
    private _negociacoesView: NegociacoesView;
    private _mensagem: IProxyMensagem;
    private _mensagemView: MensagemView;
    private _negociacaoService: NegociacaoService;    
    private _ordemAtual: string;

    constructor() {
        this._ordemAtual = ''
        this._negociacaoService = new NegociacaoService();

        this._negociacoesView = new NegociacoesView('#negociacoesView');
        this._negociacoes = new ProxyNegociacao(new Negociacoes(),
            (model: IProxyNegociacao) => { this._negociacoesView.update(model); }
        );

        this._mensagemView = new MensagemView('#mensagemView');
        this._mensagem = new ProxyMensagem(new Mensagem(),
            (model: Mensagem) => { this._mensagemView.update(model) }
        );

    }

    adiciona(event: Event) {

        event.preventDefault()

        let data = DateHelper.textoParaData(<string>this._inputData.val())
        if (!this._ehDiaUtil(data)) {
            this._mensagem.setTexto('Somente negociações em dias úteis, por favor!');
            return
        }

        const negociacao = new Negociacao(
            data,
            parseInt(<string>this._inputQuantidade.val()),
            parseFloat(<string>this._inputValor.val()));


        this._negociacoes.adiciona(negociacao)
        this._mensagem.setTexto("Negociação adicionada com sucesso");
        this._limpaFormulario()
    }

    apaga() {
        this._negociacoes.esvazia();
        this._mensagem.setTexto("Negociaçoes apagadas com sucesso");
    }

    ordena(coluna: string) {
        if (this._ordemAtual == coluna) {
            this._negociacoes.ordena(function (a, b) {
                return b[coluna] - a[coluna]
            });
        } else {
            this._negociacoes.ordena(function (a, b) {
                return a[coluna] - b[coluna]
            });
        }
        this._ordemAtual = coluna;

    }

    @throttle()
    importa() {

        function isOK(res: Response) {
            if (res.ok) {
                return res;
            } else {
                throw new Error(res.statusText);
            }
        }

        Promise.all([
            this._negociacaoService.obterNegociacoesDaSemana(isOK),
            this._negociacaoService.obterNegociacoesDaSemanaPassada(isOK),
            this._negociacaoService.obterNegociacoesDaRetrasada(isOK)
        ]).then(negociacoes => {
            negociacoes
                .reduce((accumulator, currentValue) => accumulator.concat(currentValue))
                .forEach(negociacao => this._negociacoes.adiciona(negociacao));
            this._mensagem.setTexto("Negociações importadas com sucesso.")
        });
    }

    private _ehDiaUtil(data: Date) {

        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
    }

    private _limpaFormulario(): void {
        this._inputData.val("");
        this._inputQuantidade.val(1);
        this._inputValor.val(0.0)
    }
}


enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado,
}