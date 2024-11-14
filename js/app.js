const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const $$$ = (element, event, handler) => element.addEventListener(event, handler);
const $$$$ = (father, son) => father.querySelector(son);

$$$(document, 'DOMContentLoaded', () => {
    // Seleccionar los elementos de la interfaz
    const inputEmail = $('#email');
    const inputAsunto = $('#asunto');
    const inputMensaje = $('#mensaje');
    
    $$$(inputEmail, 'blur', validar);

    $$$(inputAsunto, 'blur', validar);

    $$$(inputMensaje, 'blur', validar);

    function validar(e) {
        if(e.target.value.trim() === '') {
            console.log('vacio');
        } else {
            console.log('con contenido');
        }
    }
})