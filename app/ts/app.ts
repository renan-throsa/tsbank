import { instanciaAtual } from "./controllers/NegociacaoController";

const controller = instanciaAtual();

$('.form').on("submit", controller.adiciona.bind(controller));
$('#botao-importa').on("click", controller.importa.bind(controller));
$('#botao-apaga').on("click", controller.apaga.bind(controller));

