const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const $$$ = (element, event, handler) => element.addEventListener(event, handler);
const $$$$ = (father, son) => father.querySelector(son);

$$$(document, 'DOMContentLoaded', () => {
    const email = {
        email: '', 
        asunto: '',
        mensaje: ''
    }

    // Seleccionar los elementos de la interfaz
    const inputEmail = $('#email');
    const inputAsunto = $('#asunto');
    const inputMensaje = $('#mensaje');
    const formulario = $('#formulario');
    const btnSubmit = $('#formulario button[type="submit"]');
    
    $$$(inputEmail, 'input', validar);
    $$$(inputAsunto, 'input', validar);
    $$$(inputMensaje, 'input', validar);

    function validar(e) {
        if(e.target.value.trim() === '') {
            mostrarAlerta(`El Campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        if(e.target.id==='email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El Email no es Válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }


        limpiarAlerta(e.target.parentElement);

        // Asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();
        comprobarEmail(); 
    }

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);

        // Generar alerta
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
        referencia.appendChild(error);
    }   

    function limpiarAlerta(referencia) {
        // Comprobar si hay una alerta renderizada
        const alerta = $$$$(referencia, '.bg-red-600');
        if(alerta) alerta.remove();
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail() {
        const vacio = Object.values(email).includes('');
        if(vacio) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        } 
        
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;

    }
})
