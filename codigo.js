window.addEventListener("load", inicio);

function inicio() {
    //----------------------------------------------------------------------------------------
    //llamado de botones de funciones de las secciones
    //----------------------------------------------------------------------------------------
    let botones = document.querySelectorAll(".btnSeccion");

    for (let i = 0; i < botones.length; i++) {
        botones[i].addEventListener("click", mostrarSeccion)
    }

    document.querySelector("#btnIngresarUsuario").addEventListener("click", registrarUsuario);
    document.querySelector("#btnCensar").addEventListener("click", registroCenso);
    document.querySelector("#btnIngresoAlSistema").addEventListener("click", hacerLogin);
    document.querySelector("#btnConsultarCenso").addEventListener("click", buscarPreCensados);
    document.querySelector("#menuSalir").addEventListener("click", salir);
    document.querySelector("#btnBuscarCedula").addEventListener("click", buscarCedulasDeCensos);
    document.querySelector("#btnEliminarCenso").addEventListener("click", eliminarCenso);
    document.querySelector("#btnTotalPersonasCensadas").addEventListener("click", mostrarTotalCensados);
    document.querySelector("#btnPendientesDeValidacion").addEventListener("click", mostrarTotalNoCensados);
    document.querySelector("#btnCensistasPorDepartamento").addEventListener("click", mostrarTotalPersonasPorDepartamento);
    document.querySelector("#btnSeccionListar").addEventListener("click", listaCensados);
    document.querySelector("#btnValidar").addEventListener("click", validarCenso);
    document.querySelector("#btnseccionListaCensos").addEventListener("click", tablaCensos);



// //////////////////////////////////////////////////////////////////////////////////////////////////
//              CARGA DE DATOS
// //////////////////////////////////////////////////////////////////////////////////////////////////
    armarComboDepartamentos();
    armarComboOcupaciones();
    ocultarSecciones();
    mostrarBotones("invitado")

}

let sistema = new Sistema();


// ----------------------------------------------------------------------------------------------------
//  VARIABLES GLOBALES
// ----------------------------------------------------------------------------------------------------
let usuarioLogueado = null;

// ------------------------------------------------------------------------------------------------------
// Ocultar y mostrar secciones y botones
// ------------------------------------------------------------------------------------------------------
function mostrarSeccion() {
    ocultarSecciones();
    let idBtn = this.getAttribute("id"); //btnSeccionAgregar
    let idSeccion = idBtn.charAt(3).toLowerCase() + idBtn.substring(4);//"seccionAgregar"
    document.querySelector("#" + idSeccion).style.display = "block"
}

function mostrarBotones(tipo) {
    ocultarBotones();
    let botonesMostrar = document.querySelectorAll("." + tipo);
    for (let i = 0; i < botonesMostrar.length; i++) {
        botonesMostrar[i].style.display = "block";
    }
}

function ocultarBotones() {
    let botonesOcultar = document.querySelectorAll(".btnSeccion");
    for (let i = 0; i < botonesOcultar.length; i++) {
        botonesOcultar[i].style.display = "none";
    }
}

function ocultarSecciones() {
    let secciones = document.querySelectorAll(".seccion");
    for (let i = 0; i < secciones.length; i++) {
        secciones[i].style.display = "none"
    }
}
// ----------------------------------------------------------------------------------------------------
//Validaciones
// ----------------------------------------------------------------------------------------------------

function validarCamposVaciosCensista(unNombre, unNombreUs, unaClave) {
    // Retorna true si los tres parametros contienen algo distindo de vacío
    let campoValido = false;
    if (unNombre !== "" && unaClave !== "" && unNombreUs !== "") {
        campoValido = true;
    }
    return campoValido;
}



// Valida las especificaciones solicitadas en la clave de acceso
function formatoContraseñaValido(unaClave) {
    let tieneMinuscula = false;
    let tieneMayuscula = false;
    let tieneNumero = false;
    let mayor5Caracteres = false;

    for (let i = 0; i < unaClave.length; i++) {
        const caracter = unaClave.charAt(i);
        if (caracter >= 'a' && caracter <= 'z') {
            tieneMinuscula = true;
        } else if (caracter >= 'A' && caracter <= 'Z') {
            tieneMayuscula = true;
        } else if (caracter >= '0' && caracter <= '9') {
            tieneNumero = true;
        } if (unaClave.length >= 5) {
            mayor5Caracteres = true;
        }
    }
    // Sera valida en el único caso de que todo lo retornado sea TRUE
    return mayor5Caracteres && tieneMinuscula && tieneMayuscula && tieneNumero;
}
// Sera valida en el único caso de que ambos sean TRUE
function validarCamposVaciosRegistro(unNombre, unapellido) {
    let campoValido = false;
    if (unNombre != "" && unapellido != "") {
        campoValido = true;
    }
    return campoValido;
}

// Validar censo de usarios
function validarCenso() {
    let ci = document.querySelector("#txtCI").value;
    let censo = sistema.obtenerObjeto(sistema.censos, "cedula", ci);
    console.log(censo)
    let index = sistema.EliminarObjeto(sistema.censos, "cedula", ci);
    let id = null
    delete (sistema.censos[index])
    if (usuarioLogueado !== null) {
        valido = true
        id = sistema.obtenerid(sistema.censistas, "nombreUs")
    }
    let registrar = new Censo(censo.nombre, censo.apellido, censo.edad, censo.cedula,censo.departamento, censo.ocupacion, true,id );
    console.log(registrar);
    sistema.agregarCensos(registrar);

}
// --------------------------------------------------------------------------------------------------------
//Valida la cédula de identidad

function formatoCedulaValida(unaCedula) {
    let valida = false;
    unaCedula = eliminarCaracter(unaCedula, ".");
    unaCedula = eliminarCaracter(unaCedula, "-");
    if (unaCedula.length === 7) {
        unaCedula = "0" + unaCedula;
    }
    let multiplicador = "2987634";
    let digitoVerificar = unaCedula.charAt(unaCedula.length - 1);
    let acumulador = 0;

    for (let i = 0; i < unaCedula.length - 1; i++) {
        acumulador += Number(unaCedula.charAt(i)) * Number(multiplicador.charAt(i));
    }
    let digitoVerificador = (10 - (acumulador % 10)) % 10;

    if (digitoVerificador === Number(digitoVerificar)) {
        valida = true;
    }
    return valida;
}

function verificarLogin(nomUsuario, clave) {
    //Recibe usuario y clave y devuelve true cuando verifica el login 
    let resultado = false; //Devuelve false en cualqueir otro caso
    let UnUsuario = sistema.obtenerObjeto(sistema.censistas, "nombreUs", nomUsuario);

    if (UnUsuario !== null) { //Recorrer para ver si hay un usuario que coincida con nomUsuario
        if (UnUsuario.clave === clave) {
            usuarioLogueado = UnUsuario;
            resultado = true;
        }
    }
    return resultado;
}


// --------------------------------------------------------------------------------------------------------
// Registro, login y salida
// --------------------------------------------------------------------------------------------------------


//Vuelve a mostarse todo como en perfil invitado
function salir() {
    armarComboDepartamentos();
    ocultarSecciones();
    mostrarBotones("invitado");
    let index = sistema.EliminarObjeto(sistema.logUsuarios, 'nombre', usuarioLogueado)
    delete (sistema.logUsuarios[index])
    usuarioLogueado = null;
    document.querySelector("#nombreUsuarioLogeado").style.display = "none";
    console.log(sistema.censistas)
}

function hacerLogin() {
    let nombre = (document.querySelector("#txtNombreUsuarioLogin").value).toLowerCase();
    let clave = document.querySelector("#txtPassLogin").value;
    let login = verificarLogin(nombre, clave);
    let mensaje = ""
    if (login) {
        let logUs = new LogueadoUsuario(nombre);
        console.log(logUs);
        sistema.agregarLogueado(logUs);
        document.querySelector("#txtNombreUsuarioLogin").value = "";
        document.querySelector("#txtPassLogin").value = "";
        document.querySelector("#seccionLogin").style.display = "none";
        mostrarMenuYOculatrLoDemas()
    }
    else {
        mensaje = "Alguno de los datos requeridos, no fue ingresado correctamente."
    }
    document.querySelector("#mensajeLogin").innerHTML = mensaje;
}


function registrarUsuario() {
    let nombre = document.querySelector("#txtNombre").value;
    let clave = document.querySelector("#txtClave").value;
    let nombreUs = document.querySelector("#txtNombreUs").value;
    let mensaje = "";
    //Pasar nombre de usuario y nombre personal a minusculas
    nombre = nombre.toLowerCase();
    nombreUs = nombreUs.toLowerCase();
    // Verificar que el nombre de usuario y nombre completo no sean vacios
    if (validarCamposVaciosCensista(nombre, nombreUs, clave)) {
        if (formatoContraseñaValido(clave)) { // Verificar contraseña valida (que no esté vacía y que tenga al menos 5 caracteres)
            if (!sistema.buscarElemento(sistema.censistas, "nombreUs", nombreUs)) {     // Verificar que no haya ya un usuario registrado con ese nombre
                // Puedo registrar
                let censista = new Censista(nombre, nombreUs, clave);
                sistema.agregarCensista(censista);
                console.log(sistema.censistas)
                mensaje = "¡Registro exitoso!"
                document.querySelector("#txtNombre").value = "";
                document.querySelector("#txtClave").value = "";
                document.querySelector("#txtNombreUs").value = "";
            }
            else {
                mensaje = "Ese nombre de usuario ya existe"
            }
        }
        else {
            mensaje = "Su contraseña debe contener al menos una mayúscula, una minúscula y un número";
        }
    }
    else {
        mensaje = "Los campos no pueden ser vacíos";
    }
    document.querySelector("#mensajeRegistro").innerHTML = mensaje;
}


function mostrarMenuYOculatrLoDemas() {
    document.querySelector("#nombreUsuarioLogeado").style.display = "block";
    document.querySelector("#nombreUsuarioLogeado").innerHTML = "Bienvenido " + usuarioLogueado.nombreUs;
    document.querySelector("#navPrincipal").style.display = "block";
    document.querySelector("#seccionRegistro").style.display = "block";
    mostrarBotones("censista")

}

// ------------------------------------------------------------------------------------------------------
// Select
// ------------------------------------------------------------------------------------------------------
function armarComboDepartamentos() {
    document.querySelector("#slcDepRes").innerHTML = `<option value="-1">Seleccione...</option>`;
    for (let i = 0; i < sistema.departamentos.length; i++) {
        const unDepartamento = sistema.departamentos[i];
        document.querySelector("#slcDepRes").innerHTML += `<option value="${unDepartamento.tipo}">${unDepartamento.nombre}</option>`
    }
    document.querySelector(
        "#slcElegirDep"
    ).innerHTML = `<option value="-1">Seleccione...</option>`;
    for (let i = 0; i < sistema.departamentos.length; i++) {
        const unDepartamento = sistema.departamentos[i];
        document.querySelector(
            "#slcElegirDep"
        ).innerHTML += `<option value="${unDepartamento.tipo}">${unDepartamento.nombre}</option>`;
    }
}

function armarComboOcupaciones() {
    document.querySelector("#slcOcupacion").innerHTML = `<option value="-1">Seleccione...</option>`;
    for (let i = 0; i < sistema.opcupaciones.length; i++) {
        const unaOcupacion = sistema.opcupaciones[i];
        document.querySelector("#slcOcupacion").innerHTML += `<option value="${unaOcupacion.tipo}">${unaOcupacion.nombre}</option>`
    }
}

// ----------------------------------------------------------------------------------------------------
// Buscar 
// ----------------------------------------------------------------------------------------------------
function buscarPreCensados() {
    let mensaje = "";
    let ci = document.querySelector("#txtCI").value;
    document.querySelector("#tblPreCensados").innerHTML = "";
    document.querySelector("#txtMensajePreCensado").innerHTML = "";


    for (let i = 0; i < sistema.censos.length; i++) {
        const preCensado = sistema.censos[i];
        if (preCensado.valido) {
            if (preCensado.cedula === ci) { 
            mensaje = "Esta persona ya fue registrada";
            console.log(preCensado);
            }
        }if (!preCensado.valido) {
            if (preCensado.cedula === ci) { 
                document.querySelector("#tblPreCensados").innerHTML += `<tr>
                <td>${preCensado.nombre}</td>
                <td>${preCensado.apellido}</td>
                <td>${preCensado.edad}</td>
                <td>${preCensado.cedula}</td>
                <td>${preCensado.departamento}</td>
                <td>${preCensado.ocupacion}</td>
                </tr>`
                mensaje = "Datos recuperados";
                mostrarBotones("validar")
                mostrarMenuYOculatrLoDemas()

            }
        }if (preCensado === null) {
            if (preCensado.cedula === ci) { 
            mensaje = "Esta persona no esta registrada";
            }
            
        }
    
    }



    document.querySelector("#txtCI").innerHTML = "";
    document.querySelector("#txtMensajePreCensado").innerHTML = mensaje;

}

function buscarCedulasDeCensos() {
    let ci = document.querySelector("#txtCedula").value;
    let persona = sistema.obtenerObjeto(sistema.censos, "cedula", ci);
    console.log(persona);
    if (persona === null) {
        alert("Usuario no encontrado, complete los campos para su censo");
    } else if (persona.valido === false) {
        if (persona.nombre) {
            document.querySelector("#txtNomUs").value = persona.nombre;
        }
        if (persona.apellido) {
            document.querySelector("#txtApeUs").value = persona.apellido;
        }
        if (persona.edad) {
            document.querySelector("#txtEdad").value = persona.edad;
        }
        if (persona.cedula) {
            document.querySelector("#txtCedula").value = persona.cedula;
        }
        if (persona.departamento) {
            document.querySelector("#slcDepRes").value = persona.departamento;
        }
        if (persona.ocupacion) {
            document.querySelector("#slcOcupacion").value = persona.ocupacion;
        }
        alert("Usuario encontrado");
    } else if (persona.valido === true) {
        alert("Esta persona ya fue censada");
    }
}
// ----------------------------------------------------------------------------------------------------
//Lista de censados y Estadisticas
// ----------------------------------------------------------------------------------------------------
function listaCensados() {
    document.querySelector("#tblListaCensados").innerHTML = "";
    let totalCensados = 0; // Variable para almacenar el total de personas censadas
    // Calcular el total de personas censadas
    for (let i = 0; i < sistema.censos.length; i++) {
        const unCensado = sistema.censos[i];
        totalCensados++;
    }

    for (let i = 0; i < sistema.departamentos.length; i++) {
        const unDepartamento = sistema.departamentos[i];
        let depOIndep = 0;
        let estudia = 0;
        let noTrabaja = 0;
        let censadosDepartamento = 0;
        for (let k = 0; k < sistema.censos.length; k++) {
            const unCensado = sistema.censos[k];
            if (unCensado.departamento === unDepartamento.tipo) {
                censadosDepartamento++;
                    if (unCensado.ocupacion === 1 || unCensado.ocupacion === 2) {
                        depOIndep++;
                        console.log('A'+depOIndep)
                    }
                    if (unCensado.ocupacion === 4) {
                        estudia++;
                        console.log('B'+estudia)
                    }
                    if (unCensado.ocupacion === 3) {
                        noTrabaja++;
                        console.log('C'+noTrabaja)
                    }
                
            }
        }
        let porcentaje = (censadosDepartamento * 100 ) / totalCensados;
        document.querySelector("#tblListaCensados").innerHTML += `<tr>
            <td>${unDepartamento.nombre}</td>
            <td>${estudia}</td>
            <td>${noTrabaja}</td>
            <td>${depOIndep}</td>
            <td>${porcentaje}%</td>
        </tr>`;
    }
}


function tablaCensos() {
    document.querySelector("#tblCensos").innerHTML = "";
    for (let i = 0; i < sistema.censos.length; i++) {
        const Censos = sistema.censos[i];
        if (Censos.valido === true) {
                document.querySelector("#tblCensos").innerHTML += `<tr>
                <td>${Censos.departamento}</td>
                <td>${Censos.nombre}</td>
                <td>${Censos.cedula}</td>
                </tr>`

            }
    
}
}

function mostrarTotalCensados() {
    let mensaje = "";
    document.querySelector("#pTotalCensadoss").innerHTML = "";
    let contador = 0;
    for (let i = 0; i < sistema.censos.length; i++) {
        const censado = sistema.censos[i];
        if (censado.valido) {
            contador++;
        }
    }
    mensaje = `El total de usuarios censados es de: ${contador}`;
    document.querySelector("#pTotalCensadoss").innerHTML = mensaje;
    document.querySelector("#btnTotalPersonasCensadas").disabled = true;
    document.querySelector("#btnPendientesDeValidacion").disabled = false;
}

function mostrarTotalNoCensados() {
    let mensaje = "";
    document.querySelector("#pTotalCensadoss").innerHTML = "";
    let contador = 0;
    for (let i = 0; i < sistema.censos.length; i++) {
        const censado = sistema.censos[i];
        if (!censado.valido) {
            contador++;
        }
    }
    mensaje = `El total de usuarios no censados es de: ${contador}`;
    document.querySelector("#pTotalCensadoss").innerHTML = mensaje;
    document.querySelector("#btnPendientesDeValidacion").disabled = true;
    document.querySelector("#btnTotalPersonasCensadas").disabled = false;
}

function mostrarTotalPersonasPorDepartamento() {
    let idDepto = Number(document.querySelector("#slcElegirDep").value);
    let mensaje = "";
    document.querySelector("#pTotalCensadoss").innerHTML = "";
    let contador = 0;

    for (let i = 0; i < sistema.censos.length; i++) {
        const censado = sistema.censos[i];
        if (censado.valido) {
            if (censado.departamento === idDepto) {
                contador++
            }
        }
    }

    mensaje = `El total de usuarios censados en dicho departamento es: ${contador}`;
    document.querySelector("#pTotalCensadoss").innerHTML = mensaje;
    document.querySelector("#btnTotalPersonasCensadas").disabled = false;
    document.querySelector("#btnPendientesDeValidacion").disabled = false;
}


// ----------------------------------------------------------------------------------------------------------
// Formulario registrar censistas
// ----------------------------------------------------------------------------------------------------------


function registroCenso() {
    let nombre = document.querySelector("#txtNomUs").value;
    let apellido = document.querySelector("#txtApeUs").value;
    let edad = Number(document.querySelector("#txtEdad").value);
    let cedula = document.querySelector("#txtCedula").value;
    let ocupSeleccionado = Number(document.querySelector("#slcOcupacion").value)
    let depaSeleccionado = Number(document.querySelector("#slcDepRes").value)
    let mensaje = "";
    let valido = false;
    let id = null;
    if (usuarioLogueado !== null) {
        valido = true
        id = sistema.obtenerid(sistema.censistas, "nombreUs")
    }
    // Verificar que los datos no sean vacios
    if (validarCamposVaciosRegistro(nombre, apellido) && ocupSeleccionado !== -1 && depaSeleccionado !== -1) {
        if (!isNaN(edad) && edad >= 0 && edad <= 130) {
            if (formatoCedulaValida(cedula)) { // Verificar cedula valida (que exista)
                // Puedo registrar
                let registrar = new Censo(nombre, apellido, edad, cedula, ocupSeleccionado, depaSeleccionado, valido, id);
                sistema.agregarCensos(registrar);
                mensaje = "¡Registro exitoso!"
                document.querySelector("#txtApeUs").value = "";
                document.querySelector("#txtNomUs").value = "";
                document.querySelector("#txtEdad").value = "";
                document.querySelector("#txtCedula").value = "";
                document.querySelector("#slcOcupacion").value = "-1";
                document.querySelector("#slcDepRes").value = "-1";

            } else {
                mensaje = "Cédula ingresada invalida";
            }
        } else {
            mensaje = "Edad erronea, verifieque sus datos"
        }
    } else {
        mensaje = "Los campos no pueden ser vacíos";
    }
    document.querySelector("#mensajeDeRegistro").innerHTML = mensaje;
}


function mostrarMenuYOculatrLoDemas() {
    document.querySelector("#nombreUsuarioLogeado").style.display = "block";
    document.querySelector("#nombreUsuarioLogeado").innerHTML = "Bienvenido " + usuarioLogueado.nombreUs;
    document.querySelector("#navPrincipal").style.display = "block";
    mostrarBotones("censista")

}


// ----------------------------------------------------------------------------------------------------------
// Formulario eliminar censo
// ----------------------------------------------------------------------------------------------------------

function eliminarCenso() {
    let cedula = document.querySelector("#txtCedulaParaEliminar").value;
    let persona = sistema.obtenerObjeto(sistema.censos, "cedula", cedula);
    let index = sistema.EliminarObjeto(sistema.censos, "cedula", cedula);
    let mensaje = "";
    if (cedula === persona.cedula && persona.valido !== true) {
        delete (sistema.censos[index])
        mensaje = "Se ha eliminado correctamente"
    } else if (cedula === persona && persona.valido === true) {
        mensaje = "No se pueden eliminar los datos de un usario ya censado"
    } else {
        mensaje = "Este usuario no existe en el sistema"
    }
    document.querySelector("#mensajeDeAviso").innerHTML = mensaje;
    document.querySelector("#txtCedulaParaEliminar").value = "";

}

