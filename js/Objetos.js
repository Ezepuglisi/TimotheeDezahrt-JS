//--------------------------------------------------
//------------- CARRITO DE COMPRAS -----------------
//--------------------------------------------------   
document.addEventListener('DOMContentLoaded', cargarDatos);

var carrito = localStorage.carrito ? JSON.parse(localStorage.carrito) : [];
console.log(carrito);
var divCarrito = document.querySelector("#contenedor_carrito");
var divTotal = document.querySelector("#contenedor_total");



//---------------------------------------------

function cargarDatos(){

    const card = document.querySelector(".productos");
    cargarProd(productos,card);

} //CIERRE FUNCION CargarDatos

// FUNCION PARA CARGAR LOS PRODUCTOS 

function cargarProd(cadena,tag){
    
    cadena.forEach(nombre=>{
        
        let divgeneral = document.createElement("div");
        divgeneral.className="card col-sm-12 col-md-6 col-lg-4 col-xl-4";
        divgeneral.style="width: 18rem;"
         divgeneral.innerHTML=`<img class="img-fluid m-auto" src=${nombre.img} alt="${nombre.nombre}">
        <div class="card-body">
          <h2 class="card-title">${nombre.nombre}</h2>
          <div class="preboton">
          <p class="card-text precio valor">$ ${nombre.precio}</p>
          <button id="hover" class="add-cart" onclick="agregarACarrito(${productos.indexOf(nombre)})"><i class="fas fa-cart-plus"></i></button></div>
        </div>`;

        tag.appendChild(divgeneral);


    });
    
    
  };
  //------------------------------------------------------------

  //FILTRO DE BÚSQUEDA
  
  const busqueda = document.querySelector('#buscar');
  const botonBusqueda = document.querySelector('#botonBuscar');
  const resultado = document.querySelector('.productos');
  console.log(resultado);
  
  const filtrar = ()=>{
    resultado.innerHTML=''

    const texto = busqueda.value.toLowerCase();
    for (let producto of productos){
      let divgeneral = document.createElement("div");
      let nombre = producto.nombre.toLowerCase();
      if (nombre.indexOf(texto) !== -1){
        divgeneral.className="card col-sm-12 col-md-6 col-lg-4 col-xl-4";
        divgeneral.style="width: 18rem;"
        divgeneral.innerHTML += `<img class="img-fluid m-auto" src=${producto.img} alt="${producto.nombre}">
        <div class="card-body">
          <h2 class="card-title">${producto.nombre}</h2>
          <div class="preboton">
          <p class="card-text precio valor">$ ${producto.precio}</p>
          <button id="hover" class="add-cart" onclick="agregarACarrito(${productos.indexOf(producto)})"><i class="fas fa-cart-plus"></i></button></div>
        </div>`
        resultado.appendChild(divgeneral);
      }

      
    };
        if (resultado.innerHTML === ''){
          let noEncontrado = document.createElement("div");
          noEncontrado.className = "noEncontrado"
          noEncontrado.innerHTML = `<h3> Producto no encontrado :( ... </h3>`
          resultado.appendChild(noEncontrado);
        }
      }
  
  busqueda.addEventListener('keyup', filtrar);
  
  
  //---------------------------------------------------


// AGREGAR AL CARRITO

function agregarACarrito(index) {
  
    $(divCarrito).empty();
    var producto = productos[index];
    if (carrito.length > 0) {
      var noExiste = true;
      
      for (var i = 0; i < carrito.length; i++) {
        if (producto.nombre === carrito[i].nombre) {
          carrito[i].cantidad++;
          noExiste = false;
        }
      }
      if (noExiste) {
        producto.cantidad = 1;
        carrito.push(producto);
      }
    } else {
      producto.cantidad = 1;
      carrito.push(producto);
    }

  
    loadCarrito();
    localStorage.carrito = JSON.stringify(carrito);
  }


  //---------------------------------------------------

//FUNCION PARA CARGAR EL CARRITO

  function loadCarrito() {
    divCarrito.innerHTML = "";
    divTotal.innerHTML = "";
    carroVacio();
  
    if (carrito.length > 0) {
      var sumador = 0;
      carrito.forEach((producto) => {
        let divCar = document.createElement("div");
        divCar.className= "carrito"
        divCar.style = "clear:both; style:margin: 10px 0 0 0";
        divCar.innerHTML = `<img class="img-carrito" src="${producto.img}"> <h2>${producto.nombre}</h2> <p>$${
          producto.precio * producto.cantidad}</p><input name="${carrito.indexOf(
          producto)}" style="float:left; width:50px;   vertical-align: baseline;
        " value="${producto.cantidad}" onchange="inputChange(event)">
        <button style="float:left" onclick="removerCarrito(${carrito.indexOf(
          producto)})"><i class="fas fa-trash"></i></button>`;
        divCarrito.appendChild(divCar);
        sumador = sumador + producto.precio * producto.cantidad;
      });
  
      let divTot = document.createElement("div");
      divTotal.className="total"
      divTot.style = "clear: both";
      divTot.innerHTML = `<h2>Total: $ ${sumador}</h2>
      <a class= "btn-dark" href="pedido.html">Confirmar compra</a>
      <button onclick="borrarCarrito()"> Borrar todo </button>`;
      divTotal.appendChild(divTot);
    }
  }


  //--------------------------------------------------------

//BORRAR DEL CARRITO ITEM POR ITEM 

  function removerCarrito(index) {
    carrito[index].cantidad = carrito[index].cantidad - 1;
    if (carrito[index].cantidad <= 0) {
      carrito.splice(index, 1);

      let carritoVacio = document.querySelector(".carritoVacio");
      if (carritoVacio === null){
      let divcarr = document.createElement("p");
      divcarr.className = "carritoVacio";
      divcarr.innerHTML = `Tu carrito esta vacío`;
      divCarrito.appendChild(divcarr);
      console.log(divcarr);
      console.log(divCarrito);
    }

    }
    localStorage.carrito = JSON.stringify(carrito);
    loadCarrito();
  }

//BORRAR CARRITO TOTALMENTE

  function borrarCarrito(){
    
    // TAGS NECESARIAS PARA LA FUNCION

    let miCarrito = document.querySelectorAll(".carrito");
    let miTotal = document.querySelectorAll(".total");

    $(divCarrito).empty();
    localStorage.clear();
    $(miCarrito).empty();
    $(miTotal).empty();
    carrito = [];
    carroVacio();
    
    /*if (carrito.length<=0){
      let carritoVacio = document.querySelector(".carritoVacio");
      if (carritoVacio === null){
    let divcarr = document.createElement("p");
    divcarr.className = "carritoVacio";
    divcarr.innerHTML = `Tu carrito esta vacío`;
    $(divCarrito).append(divcarr);*/
  };


function inputChange(e) {
  if (e.target.value == 0) {
    carrito.splice(e.target.name, 1);
  } else {
    carrito[e.target.name].cantidad = e.target.value;
  }
  loadCarrito();
  localStorage.carrito = JSON.stringify(carrito);
}

function carroVacio(){
  if (carrito.length<=0){
    let carritoVacio = document.querySelector(".carritoVacio");
    if (carritoVacio === null){
  let divcarr = document.createElement("p");
  divcarr.className = "carritoVacio";
  divcarr.innerHTML = `Tu carrito esta vacío`;
  $(divCarrito).append(divcarr);
};
};
}