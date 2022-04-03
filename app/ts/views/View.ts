export abstract class View<T> {

    protected _elemento: HTMLElement | null;

    constructor(seletor: string) {
        this._elemento = document.querySelector(seletor);
    }

    update(model: T): void {
        if (this._elemento) this._elemento.innerHTML = this.template(model);        
    }

    protected abstract template(model: T): string;
}


