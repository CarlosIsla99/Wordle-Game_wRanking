'use strict';
window.addEventListener('DOMContentLoaded', function () {

    // Comprueba si el usuario ha abierto el navegador en móvil o pc
    window.mobileAndTabletCheck = function () {
        let check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };

    let check = mobileAndTabletCheck(); // Recogemos la comprobación de la función anterior

    // Inutiliza todas las las filas excepto la primera
    for (let i = 6; i <= 25; i++) {
        document.getElementById('inLetra' + i).setAttribute('disabled', true);
    }

    // Al cargar la página hace focus al primer input
    document.getElementById("inLetra1").focus();

    // Auto tabula al siguiente o previo input
    if (check == false) {
        $(".letras").keydown(function (e) {
            var myInput = $(this).closest('.letras').find('input');
            if (myInput.val().length == 1) {
                if (e.keyCode != 8) {
                    $(this).closest('.letras').next().find('input').focus();
                }
            }
            if (myInput.attr('maxlength') != myInput.val().length) {
                if (e.keyCode == 8) {
                    $(this).closest('.letras').prev().find('input').focus();
                }
            }
        });
    } else if (check == true) {
        $(".letras").keyup(function (e) {
            //var myInput = $(this).closest('.letras').find('input');
            if (e.keyCode != 8) {
                $(this).closest('.letras').next().find('input').focus();
            } else if (e.keyCode == 8) {
                $(this).closest('.letras').prev().find('input').focus();
            }
        });
    }

    // Ejecuta la comprobación al pulsar el enter
    $(document).keyup(function (e) {
        if (e.keyCode == 13) {
            comprobar();
        }
    });

});

let palabraParaAdivinar; // Variable para palabra por adivinar 
let backUpPalabar; // Back up para 'palabraParaAdivinar
let result; // Lista de todas las palabras de donde elige la palabra para adivinar
var letrasNoExistentes = []; // Array de letras que no contiene la palabra para adivinar

// Cargar la lista de palabras
fetch("./lista/lista.txt").then((response) => {
    return response.text();
}).then((text) => {
    result = text.trim().split(/\s+/); // Escribe la lista con comas, etc. para leerlo mejor
    palabraParaAdivinar = result[Math.floor(Math.random() * result.length)]; // Elige aleatpriamente una palabra de la lista
    palabraParaAdivinar = palabraParaAdivinar.toLocaleLowerCase(); // Pasa a minúscul la palabra elegida
    console.log('La palabra es: ' + palabraParaAdivinar);
    backUpPalabar = palabraParaAdivinar; // Un backUp de la palabra por adivinar
});

// recive las 25 letras del usuario
function juegoAdivinanza(letra1, letra2, letra3, letra4, letra5, letra6, letra7, letra8, letra9, letra10, letra11, letra12, letra13, letra14, letra15, letra16, letra17, letra18, letra19, letra20, letra21, letra22, letra23, letra24, letra25) {

    let acertados = 0; // Contador de letras acertadas por fila
    let fila = document.getElementById("onclick").value; // Diferenciador de filas
    let contador = parseInt(fila); // Contador para moverse entre filas

    // Letras introducidas por el usuario ordenadas en arrays (1 array por fila)
    var letrasIntroducisdasFila1 = [letra1, letra2, letra3, letra4, letra5];
    var letrasIntroducisdasFila2 = [letra6, letra7, letra8, letra9, letra10];
    var letrasIntroducisdasFila3 = [letra11, letra12, letra13, letra14, letra15];
    var letrasIntroducisdasFila4 = [letra16, letra17, letra18, letra19, letra20];
    var letrasIntroducisdasFila5 = [letra21, letra22, letra23, letra24, letra25];

    // Pasa a minúsuclas todas las letras introducidas para evitar errores
    // entre las letras que introduzca el usuario y la palabra elegida
    letrasIntroducisdasFila1 = letrasIntroducisdasFila1.map(element => {
        return element.toLowerCase();
    });
    letrasIntroducisdasFila2 = letrasIntroducisdasFila2.map(element => {
        return element.toLowerCase();
    });
    letrasIntroducisdasFila3 = letrasIntroducisdasFila3.map(element => {
        return element.toLowerCase();
    });
    letrasIntroducisdasFila4 = letrasIntroducisdasFila4.map(element => {
        return element.toLowerCase();
    });
    letrasIntroducisdasFila5 = letrasIntroducisdasFila5.map(element => {
        return element.toLowerCase();
    });

    // Referencia a cada fila por cada onclick
    var letras = document.querySelectorAll('.letras' + document.getElementById("onclick").value);
    var resultadoPalabraAdivinar = null; // Contenedor de la palabra por adivinar para pruebas
    var camposVacios = false; // Para saber si ha rellenado todos los campos

    // Comprueba que la palabra introducida por el usuario exista
    let existe = false;
    let palabraComp = null;

    // Forma la palabra que introduce el usuario según en que fila está escribiendo
    switch (fila) {
        case '0':
            palabraComp = letrasIntroducisdasFila1[0] + letrasIntroducisdasFila1[1] + letrasIntroducisdasFila1[2] + letrasIntroducisdasFila1[3] + letrasIntroducisdasFila1[4];
            break;
        case '1':
            palabraComp = letrasIntroducisdasFila2[0] + letrasIntroducisdasFila2[1] + letrasIntroducisdasFila2[2] + letrasIntroducisdasFila2[3] + letrasIntroducisdasFila2[4];
            break;
        case '2':
            palabraComp = letrasIntroducisdasFila3[0] + letrasIntroducisdasFila3[1] + letrasIntroducisdasFila3[2] + letrasIntroducisdasFila3[3] + letrasIntroducisdasFila3[4];
            break;
        case '3':
            palabraComp = letrasIntroducisdasFila4[0] + letrasIntroducisdasFila4[1] + letrasIntroducisdasFila4[2] + letrasIntroducisdasFila4[3] + letrasIntroducisdasFila4[4];
            break;
        case '4':
            palabraComp = letrasIntroducisdasFila5[0] + letrasIntroducisdasFila5[1] + letrasIntroducisdasFila5[2] + letrasIntroducisdasFila5[3] + letrasIntroducisdasFila5[4];
    }

    $('#pista').val(0); // Reinicia a 0 los intentos de pista

    if (contador <= 4) {
	console.log(contador);
        // Comprueba si todos los campos están rellenos
        if (palabraComp.length < 5 || palabraComp.length == 0) {
            camposVacios = true;
            document.getElementById("mensaje").innerHTML = 'Rellena todos los campos';
            return;
        } else {
            camposVacios = false;
            document.getElementById("mensaje").innerHTML = '';
        }
        
        // Comprueba si la palabra formada anteriormente existe
        for (let z = 0; z < result.length; z++) {
            if (result[z].toLowerCase() == palabraComp) {
                existe = true;
                document.getElementById("mensaje").innerHTML = '';
                break;
            }
        }

        // Alert si la palabra introducida no existe y detiene el programa
        if (existe == false) {
            document.getElementById("mensaje").innerHTML = 'Esa palabra no existe';
            return;
        }
    }


    // Primera fila de carácteres
    switch (fila) {
        case '0':

            // Pone en verde los carácteres acertados
            for (let z = 0; z < letrasIntroducisdasFila1.length; z++) {
                if (letrasIntroducisdasFila1[z] == palabraParaAdivinar.charAt(z)) {
                    document.getElementById(letras[z].id).style.backgroundColor = "lightgreen";
                    resultadoPalabraAdivinar = palabraParaAdivinar.replace(letrasIntroducisdasFila1[z], '0');
                    palabraParaAdivinar = resultadoPalabraAdivinar;
                    letrasIntroducisdasFila1[z] = '1';
                    acertados = acertados + 1;
                }
            }

            // Pone en naranja los carácteres acertados en el sitio que no correspone
            // y pone en gris los carácteres inexistentes
            for (let z = 0; z < letrasIntroducisdasFila1.length; z++) {
                for (let i = 0; i < letrasIntroducisdasFila1.length; i++) {
                    if (letrasIntroducisdasFila1[z] != '1' && (palabraParaAdivinar.charAt(i) != '0' && palabraParaAdivinar.charAt(i) != '2')) {
                        if (letrasIntroducisdasFila1[z] == palabraParaAdivinar.charAt(i)) {
                            palabraParaAdivinar = palabraParaAdivinar.replace(letrasIntroducisdasFila1[z], '2');
                            document.getElementById(letras[z].id).style.backgroundColor = "orange";
                            break;
                        } else {
                            document.getElementById(letras[z].id).style.backgroundColor = "rgb(191, 191, 191)";
                        }
                    }
                }
                // Si no es acertada (verde / naranja) se añade al array 'letrasNoExistentes'
                if (document.getElementById(letras[z].id).style.backgroundColor != "orange" && document.getElementById(letras[z].id).style.backgroundColor != "lightgreen") {
                    letrasNoExistentes.push(document.getElementById(letras[z].id).value);
                }
            }
            break;
        case '1':

            palabraParaAdivinar = backUpPalabar;

            for (let z = 0; z < letrasIntroducisdasFila2.length; z++) {
                if (letrasIntroducisdasFila2[z] == palabraParaAdivinar.charAt(z)) {
                    document.getElementById(letras[z].id).style.backgroundColor = "lightgreen";
                    resultadoPalabraAdivinar = palabraParaAdivinar.replace(letrasIntroducisdasFila2[z], '0');
                    palabraParaAdivinar = resultadoPalabraAdivinar;
                    letrasIntroducisdasFila2[z] = '1';
                    acertados = acertados + 1;
                }
            }

            for (let z = 0; z < letrasIntroducisdasFila2.length; z++) {
                for (let i = 0; i < letrasIntroducisdasFila2.length; i++) {
                    if (letrasIntroducisdasFila2[z] != '1' && palabraParaAdivinar.charAt(i) != '0' && palabraParaAdivinar.charAt(i) != '2') {
                        if (letrasIntroducisdasFila2[z] == palabraParaAdivinar.charAt(i)) {
                            palabraParaAdivinar = palabraParaAdivinar.replace(letrasIntroducisdasFila2[z], '2');
                            document.getElementById(letras[z].id).style.backgroundColor = "orange";
                            break;
                        } else {
                            document.getElementById(letras[z].id).style.backgroundColor = "rgb(191, 191, 191)";
                        }
                    }
                }
                if (document.getElementById(letras[z].id).style.backgroundColor != "orange" && document.getElementById(letras[z].id).style.backgroundColor != "lightgreen") {
                    letrasNoExistentes.push(document.getElementById(letras[z].id).value);
                }
            }
            break;
        case '2':

            palabraParaAdivinar = backUpPalabar;

            for (let z = 0; z < letrasIntroducisdasFila3.length; z++) {
                if (letrasIntroducisdasFila3[z] == palabraParaAdivinar.charAt(z)) {
                    document.getElementById(letras[z].id).style.backgroundColor = "lightgreen";
                    resultadoPalabraAdivinar = palabraParaAdivinar.replace(letrasIntroducisdasFila3[z], '0');
                    palabraParaAdivinar = resultadoPalabraAdivinar;
                    letrasIntroducisdasFila3[z] = '1';
                    acertados = acertados + 1;
                }
            }

            for (let z = 0; z < letrasIntroducisdasFila3.length; z++) {
                for (let i = 0; i < letrasIntroducisdasFila3.length; i++) {
                    if (letrasIntroducisdasFila3[z] != '1' && palabraParaAdivinar.charAt(i) != '0' && palabraParaAdivinar.charAt(i) != '2') {
                        if (letrasIntroducisdasFila3[z] == palabraParaAdivinar.charAt(i)) {
                            palabraParaAdivinar = palabraParaAdivinar.replace(letrasIntroducisdasFila2[z], '2');
                            document.getElementById(letras[z].id).style.backgroundColor = "orange";
                            break;
                        } else {
                            document.getElementById(letras[z].id).style.backgroundColor = "rgb(191, 191, 191)";
                        }
                    }
                }
                if (document.getElementById(letras[z].id).style.backgroundColor != "orange" && document.getElementById(letras[z].id).style.backgroundColor != "lightgreen") {
                    letrasNoExistentes.push(document.getElementById(letras[z].id).value);
                }
            }
            break;
        case '3':

            palabraParaAdivinar = backUpPalabar;

            for (let z = 0; z < letrasIntroducisdasFila4.length; z++) {
                if (letrasIntroducisdasFila4[z] == palabraParaAdivinar.charAt(z)) {
                    document.getElementById(letras[z].id).style.backgroundColor = "lightgreen";
                    resultadoPalabraAdivinar = palabraParaAdivinar.replace(letrasIntroducisdasFila4[z], '0');
                    palabraParaAdivinar = resultadoPalabraAdivinar;
                    letrasIntroducisdasFila4[z] = '1';
                    acertados = acertados + 1;
                }
            }

            for (let z = 0; z < letrasIntroducisdasFila4.length; z++) {
                for (let i = 0; i < letrasIntroducisdasFila4.length; i++) {
                    if (letrasIntroducisdasFila4[z] != '1' && palabraParaAdivinar.charAt(i) != '0' && palabraParaAdivinar.charAt(i) != '2') {
                        if (letrasIntroducisdasFila4[z] == palabraParaAdivinar.charAt(i)) {
                            palabraParaAdivinar = palabraParaAdivinar.replace(letrasIntroducisdasFila2[z], '2');
                            document.getElementById(letras[z].id).style.backgroundColor = "orange";
                            break;
                        } else {
                            document.getElementById(letras[z].id).style.backgroundColor = "rgb(191, 191, 191)";
                        }
                    }
                }
                if (document.getElementById(letras[z].id).style.backgroundColor != "orange" && document.getElementById(letras[z].id).style.backgroundColor != "lightgreen") {
                    letrasNoExistentes.push(document.getElementById(letras[z].id).value);
                }
            }
            break;
        case '4':
            palabraParaAdivinar = backUpPalabar;

            for (let z = 0; z < letrasIntroducisdasFila5.length; z++) {
                if (letrasIntroducisdasFila5[z] == palabraParaAdivinar.charAt(z)) {
                    document.getElementById(letras[z].id).style.backgroundColor = "lightgreen";
                    resultadoPalabraAdivinar = palabraParaAdivinar.replace(letrasIntroducisdasFila5[z], '0');
                    palabraParaAdivinar = resultadoPalabraAdivinar;
                    letrasIntroducisdasFila5[z] = '1';
                    acertados = acertados + 1;
                }
            }

            for (let z = 0; z < letrasIntroducisdasFila5.length; z++) {
                for (let i = 0; i < letrasIntroducisdasFila5.length; i++) {
                    if (letrasIntroducisdasFila5[z] != '1' && palabraParaAdivinar.charAt(i) != '0' && palabraParaAdivinar.charAt(i) != '2') {
                        if (letrasIntroducisdasFila5[z] == palabraParaAdivinar.charAt(i)) {
                            palabraParaAdivinar = palabraParaAdivinar.replace(letrasIntroducisdasFila2[z], '2');
                            document.getElementById(letras[z].id).style.backgroundColor = "orange";
                            break;
                        } else {
                            document.getElementById(letras[z].id).style.backgroundColor = "rgb(191, 191, 191)";
                        }
                    }
                }
                if (document.getElementById(letras[z].id).style.backgroundColor != "orange" && document.getElementById(letras[z].id).style.backgroundColor != "lightgreen") {
                    letrasNoExistentes.push(document.getElementById(letras[z].id).value);
                }
            }

    }

    letrasNoExistentes = [...new Set(letrasNoExistentes)]; // Elimina los duplicados del array

    // Elimina de la lista de 'letrasNoExistentes' los duplicados pero que se hayan encontrado
    for (let y = 0; y <= 4; y++) {
        let eliminar = document.getElementsByClassName('letras' + y);
        for (let i = 0; i < eliminar.length; i++) {
            if (eliminar[i].style.backgroundColor == 'lightgreen' || eliminar[i].style.backgroundColor == 'orange') {
                for (let z = 0; z < letrasNoExistentes.length; z++) {
                    if (String(eliminar[i].value) == String(letrasNoExistentes[z])) {
                        letrasNoExistentes.splice(z, 1);
                        z = 0;
                    }
                }
            }
        }
    }

    // Imprime en el html (#descartes) las letras que no tiene la palabra por adivinar
    var parsed = "";
    for (let i = 0; i < letrasNoExistentes.length; i++) {
        var myobj = letrasNoExistentes[i];
        parsed += '<div class="letrasNoExistente">' + myobj + '</div>';
        document.getElementById("descartes").innerHTML = parsed;
    }

    // En caso de acertar todos los carácteres salta un un mensaje de enhorabuena
    if (acertados == 5) {
        var titulo = '';
        titulo += '<img src="img/icon.png">';
        document.getElementById("nicolas_face").innerHTML = titulo;
        var imagen = '';
        imagen += '<img src="img/enhorabuena.png">';
        document.getElementById("titulo_nicolas").innerHTML = imagen;
        var button = '';
        button += '<button id="reload" onclick="location.reload();">Jugar de nuevo</button>';
        document.getElementById("reload_button").innerHTML = button;
        document.getElementById('nicolas_face_animation').style.backgroundColor = 'rgb(255, 255, 255, 0.7)';
        document.getElementById('nicolas_face_animation').style.border = '0.3rem solid rgb(30, 255, 0)';
        document.getElementById('pista').style.zIndex = "-950";
        document.getElementById('descartes').style.zIndex = "-950";
        document.getElementById('mensaje').style.display = 'none';        
        var punt = document.getElementById('score').value;

		$.ajax({
		     type: 'POST',
		     url: "puntuacionServlet",
		     success: function(resultData) {}
		});
		
        startConfetti(); // Activa una animación de confeti en toda la pantalla
		    
        // Al pulsar "Enter" vuelve a empezar el juego
        $(document).keyup(function (e) {
            if (e.keyCode == 13) {
                location.reload();
            }
        });

        // En caso contrario salta otro de "perdiste" y mostrando cual era la palabra a adivinar
    } else if (contador == 4) {
        var titulo = '';
        titulo += '<img src="img/sad_nicolas.png">';
        document.getElementById("nicolas_face").innerHTML = titulo;
        var imagen = '';
        imagen += '<img src="img/perdiste.png">';
        document.getElementById("titulo_nicolas").innerHTML = imagen;
        var button = '';
        button += '<button id="reload" onclick="location.reload();">Jugar de nuevo</button>'
            + '<div id="palabra_pista"><b> La palabra era: ' + backUpPalabar.toUpperCase() + '</b></div>';
        document.getElementById("reload_button").innerHTML = button;
        document.getElementById('nicolas_face_animation').style.backgroundColor = 'rgb(255, 255, 255, 0.7)';
        document.getElementById('nicolas_face_animation').style.border = '0.3rem solid rgb(213, 7, 7)';
        document.getElementById('nicolas_face_animation').style.marginTop = '3rem';
        document.getElementById('pista').style.zIndex = "-950";
        document.getElementById('descartes').style.zIndex = "-950";
        document.getElementById('mensaje').style.display = 'none';

        // Al pulsar "Enter" vuelve a empezar el juego
        $(document).keyup(function (e) {
            if (e.keyCode == 13) {
                location.reload();
            }
        });
    }

    // En caso de no haber vacíos
    if (camposVacios == false) {

        // Suma contador para pasar a la siguiente fila
        contador = contador + 1;
        document.getElementById("onclick").setAttribute("value", contador);

        // Si está en la segunda línea
        switch (contador) {
            case 1:
                // Establece readonly en la primera fila
                for (let i = 1; i <= 5; i++) {
                    document.getElementById('inLetra' + i).setAttribute('readonly', '');
                }
                // Quita disabled a la segunda fila
                for (let i = 6; i <= 10; i++) {
                    document.getElementById('inLetra' + i).removeAttribute('disabled', '');
                }
                document.getElementById("inLetra6").focus(); // Focus al primer input de si fila
                // Si está en la tercera línea
                break;
            case 2:
                // Establece readonly a las dos primeras filas
                for (let i = 1; i <= 10; i++) {
                    document.getElementById('inLetra' + i).setAttribute('readonly', '');
                }
                // Quita disabled a la tercera fila
                for (let i = 11; i <= 15; i++) {
                    document.getElementById('inLetra' + i).removeAttribute('disabled', '');
                }
                document.getElementById("inLetra11").focus(); // Focus al primer input de si fila
                // Si está en la cuarta línea
                break;
            case 3:
                // Establece readonly a las tres primeras filas
                for (let i = 1; i <= 15; i++) {
                    document.getElementById('inLetra' + i).setAttribute('readonly', '');
                }
                // Quita disabled a la cuarta fila
                for (let i = 16; i <= 20; i++) {
                    document.getElementById('inLetra' + i).removeAttribute('disabled', '');
                }
                document.getElementById("inLetra16").focus(); // Focus al primer input de si fila
                // Si está en la quinta línea
                break;
            case 4:
                // Establece readonly a las cuatro primeras filas
                for (let i = 1; i <= 20; i++) {
                    document.getElementById('inLetra' + i).setAttribute('readonly', '');
                }
                // Quita disabled a la quinta fila
                for (let i = 21; i <= 25; i++) {
                    document.getElementById('inLetra' + i).removeAttribute('disabled', '');
                }
                document.getElementById("inLetra21").focus(); // Focus al primer input de si fila
        }
    }
}

var lista_elegidas = ['0', '0', '0', '0', '0']; // Lista de letras que han salido como pista
var pistasRestantes = 2; // El usuario solo tiene 2 pistas

// Comprueba continuamente si el usuario se ha quedado sin pistas. En ese caso, cambia la opacidad del botón
window.setInterval(function () {
    if (pistasRestantes == 0) {
        document.getElementById("pista").style.opacity = "0.5";
        document.getElementById("pista").innerHTML = "Pista x" + pistasRestantes;
    }
}, 10)

function darPista() {

    if (pistasRestantes == 0) {
        $("#pista").off('click'); // Deshabilita el boton cuando se terminan las pistas
    } else {

        // Muestra las pistas restantes en el propio botón
        let cantidadPista = "Pista x" + (pistasRestantes - 1);
        document.getElementById("pista").innerHTML = cantidadPista;

        if (pistasRestantes > 0) {
            // Divide las letras de la palabra por adivinar y las mete en un array
            var backUpPalabarDesglosada = [];
            for (let i = 0; i < 5; i++) {
                backUpPalabarDesglosada.push(backUpPalabar.charAt(i));
            }

            // La palabra desglosada que no vamos a modificar para tener como referencia
            var listaNoCambia = [];
            for (let i = 0; i < 5; i++) {
                listaNoCambia.push(backUpPalabar.charAt(i));
            }

            // Elimina la letra escogida como pista de la lista 'backUpPalabarDesglosada'
            for (let i = 0; i < lista_elegidas.length; i++) {
                for (let z = 0; z < backUpPalabarDesglosada.length; z++) {
                    if (lista_elegidas[i] == backUpPalabarDesglosada[z]) {
                        backUpPalabarDesglosada.splice(z, 1);
                        break;
                    }
                }
            }

            // Si ya ha acertado la letra, elige otra
            var input = document.querySelectorAll("input");
            var letrasNoElegir = [];

            // Recoge en un array las letras que ya han sido acertadas
            for (let i = 0; i < input.length; i++) {
                if (input[i].style.backgroundColor == 'lightgreen') {
                    letrasNoElegir.push(input[i].value);
                }
            }


            // Elimina las letras recogidas anteriormente de la lista que se elegirá la letra como pista
            for (let i = 0; i < backUpPalabarDesglosada.length; i++) {
                for (let z = 0; z < letrasNoElegir.length; z++) {
                    if (backUpPalabarDesglosada[i] == letrasNoElegir[z]) {
                        backUpPalabarDesglosada.splice(i, 1);
                        letrasNoElegir.splice(i, 1);
                        i = 0;
                        z = -1;
                    }
                }
            }

            // Elige una letra del array de forma aleatoria
            var letraPista = backUpPalabarDesglosada[Math.floor(Math.random() * backUpPalabarDesglosada.length)];

            // Recoge la posición de la fila en la que está
            var filaActual = $("#onclick").val();

            // Guardala posición de la letra escogida
            for (let z = 0; z < listaNoCambia.length; z++) {
                if (letraPista == listaNoCambia[z] && lista_elegidas[z] == '0') {
                    if (filaActual > 0) {
                        if (input[z].style.backgroundColor == 'rgb(191, 191, 191)' || input[z].style.backgroundColor == 'orange') {
                            var posicion = z;
                            break;
                        }
                    } else {
                        var posicion = z;
                        break;
                    }

                }
            }

            // Una lista con las letras ya elegidas
            lista_elegidas.splice(posicion, 1, letraPista);

            // Inserta la pista a la fila en la que el usuario está
            $(".letras" + filaActual + ":eq(" + posicion + ")").val(letraPista);

            // Pone en verde la letra dada como pista y no deja modificar su casilla
            $(".letras" + filaActual + ":eq(" + posicion + ")").css("background-color", "lightgreen");
            $(".letras" + filaActual + ":eq(" + posicion + ")").attr('readonly', true);

            // Resta una pista
            pistasRestantes = pistasRestantes - 1;
        }

    }

}

function rendirse() {

    var titulo = '';
    titulo += '<img src="img/sad_nicolas.png">';
    document.getElementById("nicolas_face").innerHTML = titulo;
    var imagen = '';
    imagen += '<img src="img/perdiste.png">';
    document.getElementById("titulo_nicolas").innerHTML = imagen;
    var button = '';
    button += '<button id="reload" onclick="location.reload();">Jugar de nuevo</button>'
        + '<div id="palabra_pista"><b> La palabra era: ' + backUpPalabar.toUpperCase() + '</b></div>';
    document.getElementById("reload_button").innerHTML = button;
    document.getElementById('nicolas_face_animation').style.backgroundColor = 'rgb(255, 255, 255, 0.7)';
    document.getElementById('nicolas_face_animation').style.border = '0.3rem solid rgb(213, 7, 7)';
    document.getElementById('nicolas_face_animation').style.marginTop = '3rem';
    document.getElementById('pista').style.zIndex = "-950";
    document.getElementById('descartes').style.zIndex = "-950";
    document.getElementById('mensaje').style.display = 'none';

    // Al pulsar "Enter" vuelve a empezar el juego
    $(document).keyup(function (e) {
        if (e.keyCode == 13) {
            location.reload();
        }
    });

}