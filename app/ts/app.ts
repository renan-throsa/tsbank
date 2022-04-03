import { instanciaAtual } from "./controllers/NegociacaoController.js";

const controller = instanciaAtual();

document.querySelector('.form')?.addEventListener('submit', controller.adiciona.bind(controller));
document.querySelector('#botao-importa')?.addEventListener("click", controller.importa.bind(controller));
document.querySelector('#botao-apaga')?.addEventListener("click", controller.apaga.bind(controller));

