var getRoles = function () {

    var data = [];
    if (window.localStorage.getItem('id_token') !== null) {
        //isLogin = true;
        // tslint:disable-next-line: variable-name
        var id_token = window.localStorage.getItem('id_token').split('.');
        var payload = JSON.parse(atob(id_token[1]));
        return payload.role.map(function (element) {
            return { Nombre: element }
        });
    } else {
        //this.isLogin = false;
        //this.dataFilterSubject.next(this.categorias);
    }
}

var userAction = function () {
    console.info(getRoles())
    //console.log("Data: ",data)
    console.log("calling");
    var promesa = new Promise(function (resolve, reject) {
        $.ajax({
            url: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/aplicacion_rol/aplicacion_rol',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + window.localStorage.getItem('access_token'),
            },
            method: 'POST',
            data: JSON.stringify(getRoles()),
            success: function (response) {
                console.log(response);
                var nuevasAplicaciones = categorias.map(function (categoria) {

                    categoria.aplicaciones = categoria.aplicaciones.filter(function (aplicacion) {
                        return existe(aplicacion.nombre, response)
                    })
                    return categoria
                })
                nuevasAplicaciones = nuevasAplicaciones.filter(function (categoria) { return (categoria.aplicaciones.length > 0) });
                console.info(nuevasAplicaciones)
                drawMenuApp(nuevasAplicaciones)
            }
        });
        //document.getElementById("loading").setAttribute("class", "visible")
        fetch('https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/aplicacion_rol/aplicacion_rol', {
            method: 'post', // or 'PUT'
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                "Authorization": "Bearer " + window.localStorage.getItem('access_token'),
            },
            body: JSON.stringify(getRoles())
        }
        )
            .then(function (response) {
                // console.info(response);
                // var nuevasAplicaciones = categorias.map(function (categoria) {

                //     categoria.aplicaciones = categoria.aplicaciones.filter(function (aplicacion) {
                //         return existe(aplicacion.nombre, response.data)
                //     })
                //     return categoria
                // })
                // nuevasAplicaciones = nuevasAplicaciones.filter(function (categoria) { return (categoria.aplicaciones.length > 0) });
            }).catch(function (e) {
                reject(e);
            });
    });
    return promesa;
}

function drawMenuApp(nuevasAplicaciones) {
    //document.getElementById("refresh").setAttribute("class", "hidden")
    
    nuevasAplicaciones.forEach(function (categoria) {
        console.info(categoria)
        var containerAplicativos = document.getElementById('container-apps')
        var article = document.createElement('article')
        article.setAttribute("class", "card")
        var divtittle = document.createElement('div')
        divtittle.setAttribute("class", "title-app-menu-div")
        divtittle.setAttribute("style", "background-color:" + categoria.color)
        var h5Title = document.createElement('h5')
        h5Title.setAttribute('class', 'categoria-title')
        h5Title.appendChild(document.createTextNode(categoria.nombre))
        divtittle.appendChild(h5Title)
        article.appendChild(divtittle)
        containerAplicativos.appendChild(article)
        var divAppImageContainer = document.createElement('div')
        divAppImageContainer.setAttribute('class', 'app-image-container')
        article.appendChild(divAppImageContainer)

        categoria.aplicaciones.forEach(function (aplicacion) {


            var divImageApp = document.createElement('div')
            divImageApp.setAttribute('class', 'image-application')
            divImageApp.addEventListener('click',function(){redirect_url(aplicacion.url)})
            var img = document.createElement('img')
            img.setAttribute('class', 'menu-app')
            img.setAttribute('id', aplicacion.estilo)
            divImageApp.appendChild(img)
            divAppImageContainer.appendChild(divImageApp)

        })

        // var app = document.createElement('div');
        // var etiqueta = document.createElement('a');
        // var img = document.createElement('img');
        // var txt = document.createElement('span');
        // //console.log("txt",txt)
        // app.setAttribute("class", "menu_item")
        // //lista.setAttribute("class", "list-group item")
        // etiqueta.appendChild(img)
        // app.appendChild(etiqueta)
        // etiqueta.setAttribute("href", "http://" + element.Dominio)
        // img.setAttribute("class", "menu-app")
        // img.setAttribute("id", element.EstiloIcono)
        // txt.setAttribute("class", "menu-txt-app");

        // //En caso de que el elemento tenga el atributo de alias vacio se agreguegara un espacio en blanco en el menu para no descuadrar el flex
        // (element.Alias == !"" ? txt.appendChild(document.createTextNode(element.Alias)) : txt.appendChild(document.createTextNode("\u00A0")))
        // app.appendChild(txt);
        // document.getElementById('apps').appendChild(app)

    })



}
function redirect_url (path) {
    console.log(path)
    var path_sub = path.substring(0, 4);
    switch (path_sub.toUpperCase()) {
        case "HTTP":
            window.open(path, "_blank");
            break;
        
    }
}


(function($) {
    $.fn.hasScrollBar = function() {
        return this.get(0).scrollHeight > this.get(0).clientHeight;
    }
})(jQuery);


userAction();

function abrirMenu() {
    
    var containerApps=document.getElementById('menu-aplicaciones')
    var containerAplicativos = document.getElementById('container-apps') 
    var scroll= $(containerApps).hasScrollBar();
    console.log(scroll)
    if(scroll){
        containerAplicativos.classList.add("container-aplicativos-scroll");
        containerAplicativos.classList.remove("container-aplicativos")
    }else{
        containerAplicativos.classList.add("container-aplicativos");
        containerAplicativos.classList.remove("container-aplicativos-scroll");
    }

    var menu=document.getElementById('menu-aplicaciones')
    if (!menu.className.includes("menu_is_active")) {
        console.log("entro a funcion")
        menu.classList.add('menu_is_active')
    } else {
        menu.classList.remove('menu_is_active')
    }
}

var existe = function (nombre, array) {

    var filtro = array.filter(function (data) {
        return (nombre.toLowerCase() === data.Nombre.toLowerCase())
    });
    return filtro.length > 0;
}

var categorias = [
    {
        nombre: 'GAIA - Gestión Administrativa',
        color: '#8E2825',
        aplicaciones: [
            {
                nombre: 'AGORA',
                url: 'https://www.google.com',
                estilo: 'agora',
                descripcion: 'Banco de proveedores que apoya procesos de cotización y contratación',
            },
            {
                nombre: 'ARGO',
                url: 'https://www.google.com',
                estilo: 'argo',
                descripcion: 'Apoyo en la gestión de procesos precontractuales, contractuales y de compras',
            },
            {
                nombre: 'ARKA',
                url: 'https://www.google.com',
                estilo: 'arka',
                descripcion: 'Gestión de los movimientos de almacén e inventarios apoyando los procesos relacionados a bienes',
            },
            {
                nombre: 'CUMPLIDOS',
                url: 'https://pruebascumplidos.portaloas.udistrital.edu.co',
                estilo: 'cumplidos',
                descripcion: 'Apoyo de procesos postcontractuales tanto para docentes de vinculacion especial como CPS',
            },
            {
                nombre: 'RESOLUCIONES',
                url: 'https://pruebasresoluciones.portaloas.udistrital.edu.co',
                estilo: 'resoluciones',
                descripcion: 'Gestión del vinculo contractual de los docentes de vinculación especial apoyando procesos de RRHH',
            },
            {
                nombre: 'OIKOS',
                url: 'https://www.google.com',
                estilo: 'oikos',
                descripcion: 'Registro y definición de las dependencias y espacios físicos de la universidad distrital',
            },
            {
                nombre: 'SISIFO',
                url: 'https://www.google.com',
                estilo: 'sisifo',
                descripcion: 'Sistema de gestion de planes de mejoramiento para los procesos académico administrativos',
            },
            {
                nombre: 'TEMIS',
                url: 'https://www.google.com',
                estilo: 'temis',
                descripcion: 'Apoyo en la definición y cálculo de las cuotas partes pensionales con entidades externas',
            },
            {
                nombre: 'PERSEO',
                url: 'https://www.google.com',
                estilo: 'perseo',
                descripcion: 'Permitir el desarrollo de procesos electorales dentro de la universidad de forma digital',
            },
        ],
    },
    {
        nombre: 'URANO - Gestión Académica',
        color: '#15485E',
        aplicaciones: [
            {
                nombre: 'JANO',
                url: 'https://www.google.com',
                estilo: 'jano',
                descripcion: 'Apoyo en el desarrollo de concursos de mérito para ocupar plazas de planta docente',
            },
            {
                nombre: 'KYRON',
                url: 'https://www.google.com',
                estilo: 'kyron',
                descripcion: 'Registro y consolidación de información de producción académica de docentes de planta',
            },
            {
                nombre: 'POLUX',
                url: 'https://www.google.com',
                estilo: 'polux',
                descripcion: 'Apoya la gestion de trabajos de grado'
            },
            {
                nombre: 'SGA',
                url: 'https://pruebassga.portaloas.udistrital.edu.co',
                estilo: 'sga',
                descripcion: 'Apoya el desarrollo de la misión de la universidad, así como diversos procesos administrativos',
            },
            {
                nombre: 'CAMPUS',
                url: 'https://www.google.com',
                estilo: 'campus',
                descripcion: 'Campus Virtual para postgrados',
            },
            {
                nombre: 'SICIUD',
                url: 'https://www.google.com',
                estilo: 'siciud',
                descripcion: 'Una breve descripción acerca de sisiud',
            },
        ],
    },
    {
        nombre: 'NIX - Gestión Financiera',
        color: '#DE9E0F',
        aplicaciones: [
            {
                nombre: 'KRONOS',
                url: 'https://pruebaspresupuesto.portaloas.udistrital.edu.co',
                estilo: 'kronos',
                descripcion: 'Apoyar el libre desarrollo de los procesos financieros y reporte de información a entes de control',
            },
            {
                nombre: 'TITAN',
                url: 'https://www.google.com',
                estilo: 'titan',
                descripcion: 'Construir las diferentes nóminas y pago de honorarios de los compromisos contractuales',
            },
        ],
    },
    {
        nombre: 'ATHENEA - Analíticos',
        color: '#397A18',
        aplicaciones: [
            {
                nombre: 'SPAGOBI',
                url: 'https://www.google.com',
                estilo: 'spagobi',
                descripcion: 'Una breve descripción acerca de spagobi',
            },
            {
                nombre: 'CIRENE',
                url: 'https://www.google.com',
                estilo: 'cirene',
                descripcion: 'Una breve descripción acerca de cirene',
            },
            {
                nombre: 'APEA',
                url: 'https://www.google.com',
                estilo: 'apea',
                descripcion: 'Una breve descripción acerca de apea',
            },
        ],
    },
];