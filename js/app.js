const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const $$$ = (element, event, handler) => element.addEventListener(event, handler);
const $$$$ = (father, son) => father.querySelector(son);

$$$(document, 'DOMContentLoaded', () => {
    const email = {
        email: '', 
        asunto: '',
        mensaje: '',
        cc: ''
    }

    // Seleccionar los elementos de la interfaz
    const inputEmail = $('#email');
    const inputAsunto = $('#asunto');
    const inputMensaje = $('#mensaje');
    const inputCC = $('#cc');
    const formulario = $('#formulario');
    const btnSubmit = $('#formulario button[type="submit"]');
    const btnReset = $('#formulario button[type="reset"]');
    const spinner = $('#spinner');
    
    $$$(inputEmail, 'input', validar);
    $$$(inputAsunto, 'input', validar);
    $$$(inputMensaje, 'input', validar);
    $$$(inputCC, 'input', validar);
    

    $$$(formulario, 'submit', enviarEmail);

    $$$(btnReset, 'click', (e) => {
        e.preventDefault();
        resetFormulario();
    });

    function enviarEmail(e) {
        e.preventDefault();
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            resetFormulario();

            // Crear una alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje Enviado Correctamente';
            
            formulario.appendChild(alertaExito);

            setTimeout(()=> {
                alertaExito.remove();
            }, 3000);
            
        }, 3000);
    }

    function validar(e) {
        if(e.target.value.trim() === '') {
            if(e.target.id === 'cc') {
                email[e.target.name] = '';
                limpiarAlerta(e.target.parentElement);
                return;
            }
            
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
        if(e.target.id==='cc' && !validarEmail(e.target.value)) {
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

    function resetFormulario() {
        Object.keys(email).forEach(key => {
            email[key] = '';
        });

        formulario.reset();
        comprobarEmail();
    }
})
