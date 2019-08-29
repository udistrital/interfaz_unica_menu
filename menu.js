
var x = [];
var google = {
    url: "www.google.com",
    image_url: "https://s3-us-west-2.amazonaws.com/devcodepro/media/blog/la-fundacion-de-google.png",
    nombre: "google"
}
var userAction = function () {
    console.log("calling");
    var promesa = new Promise(function (resolve, reject) {
        document.getElementById("loading").setAttribute("class", "visible")
        fetch('http://10.20.0.254/configuracion_api/v1/aplicacion?limit=-1')
            .then(function (data) {
                console.log("resolve")
                document.getElementById("loading").setAttribute("class", "hidden");
                resolve(data.json());
            }).catch(function (e) {
                reject(e);
            });
    });
    return promesa;
}

function drawMenuApp() {
    document.getElementById("refresh").setAttribute("class", "hidden")
    userAction().then(function (res) {
        res.forEach(function (element) {
            console.table(element)
            var app = document.createElement('div');
            var etiqueta = document.createElement('a');
            var img = document.createElement('img');
            var txt =document.createElement('span');
            app.setAttribute("class", "menu_item")
            //lista.setAttribute("class", "list-group item")
            etiqueta.appendChild(img)
            app.appendChild(etiqueta)
            etiqueta.setAttribute("href", "http://" + element.Dominio)
            img.setAttribute("class", "menu-app")
            img.setAttribute("id",element.EstiloIcono)
            txt.setAttribute("class","menu-txt-app")                            
            //En caso de que el elemento tenga el atributo de alias vacio se agreguegara un espacio en blanco en el menu para no descuadrar el flex
            (element.Alias==!""?txt.appendChild(document.createTextNode(element.Alias)):txt.appendChild(document.createTextNode("\u00A0")))
            app.appendChild(txt);
            document.getElementById('apps').appendChild(app)
            
        })

    })
        .catch(function (e) {
            document.getElementById("loading").setAttribute("class", "hidden")
            document.getElementById("refresh").setAttribute("class", "visible")
        });
}

// function createComponents(obj){
//     obj.forEach(function(element){
//         document.createElement(element)

//     })
// }
drawMenuApp();

// myJson.then((response)=>{
//   console.log(response);
// }).catch((error)=>{
//   console.log(error)
// });

