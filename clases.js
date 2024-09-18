let idCensista = 1;
let idCenso = 1;


class LogueadoUsuario {
  constructor(nombreLog) {
    this.nombre = nombreLog;
  }
}

class Ocupacion {
  constructor(tipo, nombre) {
    this.tipo = tipo;
    this.nombre = nombre;
  }
}

class Departamento {
  constructor(tipo, nombre) {
    this.tipo = tipo;
    this.nombre = nombre;
  }
}

class Censo {
  constructor(unNombre, unaApellido, unaEdad, unaCedula, tipoDepartamento, tipoOcupacion, validoC, unIdCensista) {
    this.id = idCenso;
    this.nombre = unNombre;
    this.apellido = unaApellido;
    this.edad = unaEdad;
    this.cedula = unaCedula;
    this.departamento = tipoDepartamento;
    this.ocupacion = tipoOcupacion;
    this.valido = validoC;
    this.idCensista = unIdCensista;
    idCenso++;

  }

}
class Censista {
  // Define la estructura de un objeto Censista
  constructor(unNombre, unNomUs, unaClave) {
    this.id = idCensista; // Genera un ID único automáticamente
    this.nombre = unNombre;
    this.nombreUs = unNomUs;
    this.clave = unaClave;

    idCensista++;
  }


  nombreUsuarioExiste(nombreUsuario) {
    for (let i = 0; i < sistema.censistas.length; i++) {
      if (sistema.censistas[i].nombreUs === nombreUsuario) {
        return true;
      }
    }
    return false;
  }
}


