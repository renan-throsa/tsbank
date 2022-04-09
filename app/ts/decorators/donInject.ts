export function domInject(seletor: string) {

    return function (target: object, key: string) {

        let elemento: HTMLInputElement;

        const getter = function () {

            if (!elemento) {
                //console.log(`buscando  ${seletor} para injetar em ${key}`);
                elemento = document.querySelector(seletor) as HTMLInputElement;
            }

            return elemento;
        }

        Object.defineProperty(target, key, {
            get: getter
        });
    }
}