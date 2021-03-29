(function(){

    var formulario = document.getElementsByName("formulario")[0],
        elementos = formulario.elements;
        boton = document.getElementById("btn");

    var validarNombre = function(e){
        if (formulario.nombre.value == 0) {
            alert("Olvidaste escribir tu nombre.");
            e.preventDefault();
        }
    };

    var validarTexto = function (e) {
        if (formulario.texto.value == 0) {
            alert("Escríbenos un mensaje.");
            e.preventDefault();
        }
    }

    var validarEmail = function (e) {
        if (formulario.mail.value == 0) {
            alert("Olvidaste escribir tu email.");
            e.preventDefault();
        }
    };

    var validar = function(e){
        validarNombre(e);
        validarEmail(e);
        validarTexto(e);
        e.preventDefault();
        
        

        let nombre = document.getElementById("nombre").value;
        let mail = document.getElementById("mail").value;
        localStorage.setItem("Nombre", nombre);
        localStorage.setItem("Email",mail)
    };

    formulario.addEventListener("submit", validar);


}());


$("submit").click(function(){
    $.ajax({
        url:"usuarios.json",
        datatype:"json",
        success: function (response){
            $.each(response.usuarios, function(item){
                alert(item.nombre);
                console.log(response.usuario)
            });
        }  
      });
});
