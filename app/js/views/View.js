export class View {
    constructor(seletor) {
        this._elemento = document.querySelector(seletor);
    }
    update(model) {
        if (this._elemento)
            this._elemento.innerHTML = this.template(model);
    }
}
