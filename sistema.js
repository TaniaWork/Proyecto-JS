class Sistema {
    constructor() {
        this.departamentos = [
            new Departamento(1, "Canelones"),
            new Departamento(2, "Maldonado"),
            new Departamento(3, "Rocha"),
            new Departamento(4, "Treinta y Tres"),
            new Departamento(5, "Cerro Largo"),
            new Departamento(6, "Rivera"),
            new Departamento(7, "Artigas"),
            new Departamento(8, "Salto"),
            new Departamento(9, "Paysandú"),
            new Departamento(10, "Rio Negro"),
            new Departamento(11, "Soriano"),
            new Departamento(12, "Colonia"),
            new Departamento(13, "San José"),
            new Departamento(14, "Flores"),
            new Departamento(15, "Florida"),
            new Departamento(16, "Lavalleja"),
            new Departamento(17, "Durazno"),
            new Departamento(18, "Tacuarembó"),
            new Departamento(19, "Montevideo")
        ];
        this.opcupaciones = [
            new Ocupacion(1, "Dependiente"),
            new Ocupacion(2, "Independiente"),
            new Ocupacion(3, "No trabaja"),
            new Ocupacion(4, "Estudiante")
            
        ];
        this.censistas = [
            // Agregar censistas al array
            new Censista("geronimo", "gstar", "Gero1234"),
            new Censista("tania", "tdenucci", "Tania1234"),
            new Censista("sofia", "soff", "Soffi1234"),

        ];

        this.censos = [
            new Censo("Silvia", "Vila", 47, '30527161', 19, 4, true, 1),
            new Censo("Gustabo", "Peña", 62, '11111111', 6, 3, false, 2),
            new Censo("Tamara", "Costa", 30, '30527062', 4, 2, true, 3),
            new Censo("Romina", "Benitez", 47, '52467925', 7, 2, true, 4),
            new Censo("Samuel", "Merina", 62, '53609924', 6, 3, false, 5),
            new Censo("Yamila", "Delgado", 30, '16380246', 4, 2, false, 6),
            new Censo("Lucia", "Ramos", 47, '67258900', 4, 2, true, 7),
            new Censo("Adrian", "Pintos", 62, '55267889', 12, 2, false, 8),
            new Censo("Franco", "De Leon", 30, '52237745', 4, 4, false, 9),
            new Censo("Facuando", "Viera", 47, '99663355', 6, 2, true, 10),
            new Censo("Samara", "Nuez", 62, '44267893', 6, 2, false, 11),
            new Censo("Tatiana", "Morales", 30, '67773468', 4, 3, false, 12),
            new Censo("Kamila", "Cardozo", 47, '33356677', 16, 1, true, 13),
            new Censo("Faustina", "Castro", 62, '77773356', 6, 2, false, 14),
            new Censo("Diego", "Correa", 30, '55555567', 7, 2, false, 15),
            new Censo("Pricila", "Acosta", 47, '22244678', 4, 2, true, 16),
            new Censo("Ignacio", "Hernandez", 62, '25673455', 6, 3, false, 17),
            new Censo("Leonardo", "Ferreira", 30, '88235567', 9, 1, true, 18),
            new Censo("Richard", "Gomez", 47, '22455567', 4, 2, true, 19),
            new Censo("Agustin", "Cabrera", 62, '44444321', 6, 1, false, 20),
            new Censo("Florencia", "Olivera", 30, '56662234', 4, 1, false, 21),
            new Censo("Erick", "Diaz", 47, '444444447', 11, 2, true, 22),
            new Censo("Yanet", "Silva", 62, '22222222', 6, 4, false, 23),
            new Censo("Brian", "Gracia", 30, '33355775', 5, 2, false, 24),
            new Censo("Felipe", "Torres", 47, '24446789', 11, 4, true, 25),
            new Censo("Santiago", "Gonzalez", 62, '23458438', 6, 2, false, 26),
            new Censo("Willyam", "Martinez", 30, '43287567', 4, 4, false, 27),
            new Censo("Blanca", "Pereira", 47, '36489615', 5, 2, true, 28),
            new Censo("Daniel", "Rodriguez", 62, '75612348', 8, 4, false, 29),
            new Censo("Dilan", "Sosa", 30, '95462210', 4, 2, false, 30)
        ];
        this.logUsuarios = [];
    }

    agregarLogueado(usLog) {
        this.logUsuarios.push(usLog);
    }

    agregarCensista(censista) {
        this.censistas.push(censista);
    }
    agregarCensos(censos) {
        this.censos.push(censos);
    }

    sobreEscribirInformacionCenso(nombre, apellido, edad, departamento, ocupacion) {
        let censo = this.obtenerObjeto(this.censos, "cedula", cedula);
        censo.nombre = nombre
        censo.apellido = apellido;
        censo.edad = edad;
        censo.departamento = departamento;
        censo.ocupacion = ocupacion;
    }
    buscarElemento(arrElementos, propiedad, busqueda) {
        let existe = false;
        for (let i = 0; i < arrElementos.length; i++) {
            const unElemento = arrElementos[i];
            if (unElemento[propiedad] === busqueda) {
                existe = true;
                break;
            }
        }
        return existe;
    }

    obtenerObjeto(arrElementos, propiedad, busqueda) {
        let objeto = null;
        for (let i = 0; i < arrElementos.length; i++) {
            const unElemento = arrElementos[i];
            if (unElemento[propiedad] === busqueda) {
                objeto = unElemento;
                break
            }
        }
        return objeto;
    }

    obtenerid(arrElementos, propiedad) {
        let objeto = null;
        const usuario = sistema.logUsuarios[0];
        for (let i = 0; i < arrElementos.length; i++) {
            const unElemento = arrElementos[i];
            if (unElemento[propiedad] === usuario['nombre']) {
                console.log(unElemento['id'])
                objeto = unElemento['id'];
                break
            }
        }
        return objeto;
    }



    EliminarObjeto(arrElementos, propiedad, busqueda) {
        let objeto = null;
        for (let i = 0; i < arrElementos.length; i++) {
            const unElemento = arrElementos[i];
            if (unElemento[propiedad] === busqueda) {
                objeto = i;
                break
            }
        }
        return objeto;
    }


}

