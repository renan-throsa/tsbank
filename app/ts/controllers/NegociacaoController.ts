import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes, Negociacao, NegociacaoParcial } from '../models/index';
import { domInject, throttle } from '../decorators/index';
import { DateHelper } from '../helpers/index';
import { NegociacaoService } from '../services/index'
import { IProxy } from '../decorators/IProxy';
import { Proxy } from '../decorators/Proxy';

export class NegociacaoController {


    @domInject('#data')
    private _inputData: JQuery;
    @domInject('#quantidade')
    private _inputQuantidade: JQuery;
    @domInject('#valor')
    private _inputValor: JQuery;
    private _negociacoes: IProxy;
    private _negociacoesView: NegociacoesView;
    private _mensagemView: MensagemView;
    private _negociacaoService: NegociacaoService;

    constructor() {

        this._negociacoes = new Proxy(new Negociacoes(), (model: IProxy) => {
            this._negociacoesView.update(model)
        })
        this._negociacoesView = new NegociacoesView('#negociacoesView');
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView = new MensagemView('#mensagemView');
        this._negociacaoService = new NegociacaoService();
    }


    adiciona(event: Event) {

        event.preventDefault()

        let data = DateHelper.textoParaData(<string>this._inputData.val())
        if (!this._ehDiaUtil(data)) {
            this._mensagemView.update('Somente negociações em dias úteis, por favor!');
            return
        }

        const negociacao = new Negociacao(
            data,
            parseInt(<string>this._inputQuantidade.val()),
            parseFloat(<string>this._inputValor.val()));


        this._negociacoes.adiciona(negociacao)
        this._mensagemView.update('Negociação adicionada com sucesso.');
        this._limpaFormulario()
    }

    apaga() {
        this._negociacoes.esvazia();
        this._mensagemView.update('Negociações apagadas com sucesso.');
    }

    @throttle()
    importarDados() {

        function isOK(res: Response) {

            if (res.ok) {
                return res;
            } else {
                throw new Error(res.statusText);
            }
        }

        this._negociacaoService.obterNegociacoes(isOK)
            .then(negociacoes => {
                negociacoes.forEach(negociacao =>
                    this._negociacoes.adiciona(negociacao));
            });

    }

    private _ehDiaUtil(data: Date) {

        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
    }

    private _limpaFormulario(): void {
        this._inputData.val("");
        this._inputQuantidade.val(1);
        this._inputValor.val(0)
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