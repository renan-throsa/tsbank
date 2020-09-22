 export abstract class View<T> {

    private _elemento: JQuery;

    constructor(seletor: string) {

        // erro de compilação
        this._elemento = $(seletor);
    }

    update(model: T) {

        this._elemento.html(this.template(model));
    }

    abstract template(model: T): string;
}


