import { domInject, throttle } from "../decorators/index.js";
import { Mensagem, Negociacao, Negociacoes } from "../models/index.js";
import { NegociacaoService } from "../services/index.js";
import { MensagemView, NegociacoesView } from "../views/index.js";
import { DateHelper, IProxyMensagem, IProxyNegociacao, ProxyMensagem, ProxyNegociacao }
    from "../helpers/index.js";
import { DiasDaSemana } from "../enums/DiasDaSemana.js";

class NegociacaoController {

    @domInject('#data')
    private _inputData: HTMLInputElement;
    @domInject('#quantidade')
    private _inputQuantidade: HTMLInputElement;
    @domInject('#valor')
    private _inputValor: HTMLInputElement;
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
        
        this._negociacaoService
            .lista()
            .then(negociacoes => {                      
                negociacoes.forEach(negociacao => {
                    this._negociacoes.adiciona(negociacao);
                });
            });
            
    }

    public adiciona(event: Event): void {

        event.preventDefault();
        let negociacao: any = this._criaNegociacao();        
        if (negociacao) {
            this._negociacaoService
                .cadastra(negociacao)
                .then(memsagem => {
                    this._negociacoes.adiciona(negociacao);
                    this._mensagem.setTexto(memsagem);
                    this._limpaFormulario();
                });
        }

    }

    public apaga(): void {
        this._negociacaoService
            .apagaTudo()
            .then(memsagem => {
                this._mensagem.setTexto(memsagem);
                this._negociacoes.esvazia();
            });

    }

    public ordena(coluna: string): void {
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
    public importa(): void {
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
            console.log(negociacoes);
            return negociacoes
                .reduce((accumulator, currentValue) => accumulator.concat(currentValue))
        }).then(negociacoes => {
            return negociacoes
                .filter(negociacao => !this._negociacoes.contem(negociacao));
        }).then(negociacoes => {
            negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
            this._mensagem.setTexto("Negociações importadas com sucesso.")
        }).catch((reason) => { console.log(reason) })

    }

    private _criaNegociacao(): Negociacao | null {
        let data = DateHelper.textoParaData(this._inputData.value)
        if (!this._ehDiaUtil(data)) {
            this._mensagem.setTexto('Somente negociações em dias úteis, por favor!');
            return null
        } else {
            const negociacao = new Negociacao(
                data,
                parseInt(this._inputQuantidade.value),
                parseFloat(this._inputValor.value));

            return negociacao;
        }

    }
    private _ehDiaUtil(data: Date): boolean {
        return data.getDay() != DiasDaSemana.Sabado && data.getDay() != DiasDaSemana.Domingo;
    }

    private _limpaFormulario(): void {
        this._inputData.value = '';
        this._inputQuantidade.value = '1';
        this._inputValor.value = '0.0';
        this._inputData.focus();
    }

}

const controller = new NegociacaoController();
export function instanciaAtual() {    
    return controller;
}