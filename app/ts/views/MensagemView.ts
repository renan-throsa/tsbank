import { View } from "./View";
import { Mensagem } from "../models/Mensagem";

export class MensagemView extends View<Mensagem> {

    template(model: Mensagem): string {
        return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : '<p></p>';
    }
}
