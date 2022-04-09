export function domInject(seletor) {
    return function (target, key) {
        let elemento;
        const getter = function () {
            if (!elemento) {
                elemento = document.querySelector(seletor);
            }
            return elemento;
        };
        Object.defineProperty(target, key, {
            get: getter
        });
    };
}
