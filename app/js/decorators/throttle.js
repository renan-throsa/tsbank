export function throttle(milissegundos = 1000) {
    return function (target, propertyKey, descriptor) {
        const metodoOriginal = descriptor.value;
        let timer = 0;
        descriptor.value = function (...args) {
            if (window.event)
                window.event.preventDefault();
            clearInterval(timer);
            timer = setTimeout(() => metodoOriginal.apply(this, args), milissegundos);
        };
        return descriptor;
    };
}
