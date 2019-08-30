var userAction = function () {
    if (window.localStorage.getItem("id_token")!==null){
        var id_token=window.localStorage.getItem("id_token").split(".");
        var payload=JSON.parse(atob(id_token[1]))
        console.log(payload.role)
        var data=[]
        payload.role.forEach(function(element){
            var rol={Nombre:element}
            data.push(rol)        
            })            
        }
console.log("calling");
var promesa = new Promise(function (resolve, reject) {
    document.getElementById("loading").setAttribute("class", "visible")
    fetch('http://pruebasapi.intranetoas.udistrital.edu.co:8086/v1/aplicacion_rol/aplicacion_rol',{
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be string or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }
    )
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
            //console.table(element)
            var app = document.createElement('div');
            var etiqueta = document.createElement('a');
            var img = document.createElement('img');
            var txt =document.createElement('span');
            //console.log("txt",txt)
            app.setAttribute("class", "menu_item")
            //lista.setAttribute("class", "list-group item")
            etiqueta.appendChild(img)
            app.appendChild(etiqueta)
            etiqueta.setAttribute("href", "http://" + element.Dominio)
            img.setAttribute("class", "menu-app")
            img.setAttribute("id",element.EstiloIcono)
            txt.setAttribute("class","menu-txt-app");                
            
            //En caso de que el elemento tenga el atributo de alias vacio se agreguegara un espacio en blanco en el menu para no descuadrar el flex
            (element.Alias==!""?txt.appendChild(document.createTextNode(element.Alias)):txt.appendChild(document.createTextNode("\u00A0")))
            app.appendChild(txt);
            document.getElementById('apps').appendChild(app)
            
        })

    })
        .catch(function (e) {
            console.log(e);
            document.getElementById("loading").setAttribute("class", "hidden")
            document.getElementById("refresh").setAttribute("class", "visible")
        });
}

drawMenuApp();

function abrirMenu(){
    var menu=document.getElementById('menu')
    if (!menu.className.includes("menu_is_active")){
        console.log("entro a funcion")
        menu.classList.add('menu_is_active')
    }else{
        menu.classList.remove('menu_is_active')
    }
}