var _a, _b, _c;
import { instanciaAtual } from "./controllers/NegociacaoController.js";
const controller = instanciaAtual();
(_a = document.querySelector('.form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', controller.adiciona.bind(controller));
(_b = document.querySelector('#botao-importa')) === null || _b === void 0 ? void 0 : _b.addEventListener("click", controller.importa.bind(controller));
(_c = document.querySelector('#botao-apaga')) === null || _c === void 0 ? void 0 : _c.addEventListener("click", controller.apaga.bind(controller));
