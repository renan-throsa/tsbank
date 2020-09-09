
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


//npm install @types/jquery@3.3.36 "typescript": "^3.7.5"
// https://libraries.io/npm/@types%2Fjquery/3.3.36