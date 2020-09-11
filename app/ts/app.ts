import { NegociacaoController } from './controllers/NegociacaoController'
const controller = new NegociacaoController();

$('.form').on("submit", controller.adiciona.bind(controller));
$('#botao-importa').on("click", controller.importarDados.bind(controller));
$('#botao-apaga').on("click", controller.apaga.bind(controller));

