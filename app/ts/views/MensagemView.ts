import { View } from "./View.js";
import { Mensagem } from "../models/Mensagem.js";

export class MensagemView extends View<Mensagem> {

    protected template(model: Mensagem): string {
        return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : '<p></p>';
    }
}
