const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const $$$ = (element, event, handler) => element.addEventListener(event, handler);
const $$$$ = (father, son) => father.querySelector(son);

$$$(document, 'DOMContentLoaded', () => {
    // Seleccionar los elementos de la interfaz
    const inputEmail = $('#email');
    const inputAsunto = $('#asunto');
    const inputMensaje = $('#mensaje');
    const formulario = $('#formulario');
    
    $$$(inputEmail, 'blur', validar);
    $$$(inputAsunto, 'blur', validar);
    $$$(inputMensaje, 'blur', validar);

    function validar(e) {
        if(e.target.value.trim() === '') {
            mostrarAlerta(`El Campo ${e.target.id} es obligatorio`, e.target.parentElement);
        } else {
            console.log('con contenido');
        }
    }

    function mostrarAlerta(mensaje, referencia) {
        // Comprobar si hay una alerta renderizada
        const alerta = $$$$(referencia, '.bg-red-600');
        if(alerta) alerta.remove();

        // Generar alerta
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
        referencia.appendChild(error);
    }   
})
