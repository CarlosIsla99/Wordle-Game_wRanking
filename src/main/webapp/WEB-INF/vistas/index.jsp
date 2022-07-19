<%@ include file="/WEB-INF/vistas/includes/cabecera.jsp" %>

<body>

    <div id="nicolas_face_animation">
        <div id="titulo_nicolas">

        </div>
        <div id="nicolas_face">

        </div>
        <div id="reload_button">

        </div>
    </div>

<div class="d-flex">
    <div id="info">
        <img src="img/question.png" alt="">
        <div id="reglas" class="w3-animate-opacity">
            <strong>Informacíon de ayuda</strong>
            <table>
                <tr>
                    <td><b>1.</b> Las letras en naranja son letras acertadas pero
                        no están en su sitio correspondiente</td>
                </tr>
                <tr>
                    <td><b>2.</b> Las letras en verde son letras acertadas</td>
                </tr>
                <tr>
                    <td><b>3.</b> Solo tienes dos pistas disponibles</td>
                </tr>
                <tr>
                    <td><b>4.</b> Las palabras no están acentuadas</td>
                </tr>
                <tr>
                    <td><b>5.</b> No se puede dejar espacios libres</td>
                </tr>
                <tr>
                    <td><b>6.</b> Solo se admiten palabras existetes</td>
                </tr>
            </table>
        </div>
    </div>
    <c:forEach items="${usuarios}" var="usuario">
    	<c:if test="${usuario.id == sessionScope.usuario.id}">
    		<input type="number" id="score" value="${usuario.score}" class="puntos align-self-center" readonly>
    		<span style="color: black;" class="align-self-center mx-1"><b>pts</b></span>
    	</c:if>
    </c:forEach>
</div>

    <main>

        <aside id="publicidad1" class="publicidad">
            <!-- PUBLICIDAD -->
        </aside>

        <div id="cuadrosInputs" class="cuadroInputs">

            <div id="mensaje"></div>
            <div id="descartes"></div>

            <div id="intento1" class="intentos">
                <div class="letras">
                    <input class="letras0" maxlength="1" type="text" id="inLetra1" autocomplete="off">
                </div>
                <div class="letras">
                    <input class="letras0" maxlength="1" type="text" id="inLetra2" autocomplete="off">
                </div>
                <div class="letras">
                    <input class="letras0" maxlength="1" type="text" id="inLetra3" autocomplete="off">
                </div>
                <div class="letras">
                    <input class="letras0" maxlength="1" type="text" id="inLetra4" autocomplete="off">
                </div>
                <div class="letras">
                    <input class="letras0" maxlength="1" type="text" id="inLetra5" autocomplete="off">
                </div>
            </div>

            <div id="intento2" class="intentos">
                <div class="letras">
                    <input class="letras1" maxlength="1" type="text" id="inLetra6" autocomplete="off">
                </div>
                <div class="letras">
                    <input class="letras1" maxlength="1" type="text" id="inLetra7" autocomplete="off">
                </div>
                <div class="letras">
                    <input class="letras1" maxlength="1" type="text" id="inLetra8" autocomplete="off">
                </div>
                <div class="letras">
                    <input class="letras1" maxlength="1" type="text" id="inLetra9" autocomplete="off">
                </div>
                <div class="letras">
                    <input class="letras1" maxlength="1" type="text" id="inLetra10" autocomplete="off">
                </div>
            </div>

            <div id="intento3" class="intentos">
                <div class="letras">
                    <input class="letras2" maxlength="1" type="text" id="inLetra11" autocomplete="off">
                </div>
                <div class="letras">
                    <input class="letras2" maxlength="1" type="text" id="inLetra12" autocomplete="off">
                </div>
                <div class="letras">
                    <input class="letras2" maxlength="1" type="text" id="inLetra13" autocomplete="off">
                </div>
                <div class="letras">
                    <input class="letras2" maxlength="1" type="text" id="inLetra14" autocomplete="off">
                </div>
                <div class="letras">
                    <input class="letras2" maxlength="1" type="text" id="inLetra15" autocomplete="off">
                </div>
            </div>

            <div id="intento4" class="intentos">
                <div class="letras">
                    <input class="letras3" maxlength="1" type="text" id="inLetra16" autocomplete="off">
                </div>
                <div class="letras">
                    <input class="letras3" maxlength="1" type="text" id="inLetra17" autocomplete="off">
                </div>
                <div class="letras">
                    <input class="letras3" maxlength="1" type="text" id="inLetra18" autocomplete="off">
                </div>
                <div class="letras">
                    <input class="letras3" maxlength="1" type="text" id="inLetra19" autocomplete="off">
                </div>
                <div class="letras">
                    <input class="letras3" maxlength="1" type="text" id="inLetra20" autocomplete="off">
                </div>
            </div>

            <div id="intento5" class="intentos">
                <div class="letras">
                    <input class="letras4" maxlength="1" type="text" id="inLetra21" autocomplete="off">
                </div>
                <div class="letras">
                    <input class="letras4" maxlength="1" type="text" id="inLetra22" autocomplete="off">
                </div>
                <div class="letras">
                    <input class="letras4" maxlength="1" type="text" id="inLetra23" autocomplete="off">
                </div>
                <div class="letras">
                    <input class="letras4" maxlength="1" type="text" id="inLetra24" autocomplete="off">
                </div>
                <div class="letras">
                    <input class="letras4" maxlength="1" type="text" id="inLetra25" autocomplete="off">
                </div>
            </div>

            <div class="botones">
                <button id="onclick" value="0" onclick="comprobar()">Comprobar</button>
                <button id="pista" value="2" onclick="pista()">Pista x2</button>
                <button id="rendir" onclick="rendir()">Rendirse</button>
            </div>

        </div>

        <aside id="publicidad2" class="publicidad">
            <!-- PUBLICIDAD -->
        </aside>

    </main>

    <script>

        // Envía todas las letras de los input
        function comprobar() {

            let letra1 = document.getElementById("inLetra1").value;
            let letra2 = document.getElementById("inLetra2").value;
            let letra3 = document.getElementById("inLetra3").value;
            let letra4 = document.getElementById("inLetra4").value;
            let letra5 = document.getElementById("inLetra5").value;

            let letra6 = document.getElementById("inLetra6").value;
            let letra7 = document.getElementById("inLetra7").value;
            let letra8 = document.getElementById("inLetra8").value;
            let letra9 = document.getElementById("inLetra9").value;
            let letra10 = document.getElementById("inLetra10").value;

            let letra11 = document.getElementById("inLetra11").value;
            let letra12 = document.getElementById("inLetra12").value;
            let letra13 = document.getElementById("inLetra13").value;
            let letra14 = document.getElementById("inLetra14").value;
            let letra15 = document.getElementById("inLetra15").value;

            let letra16 = document.getElementById("inLetra16").value;
            let letra17 = document.getElementById("inLetra17").value;
            let letra18 = document.getElementById("inLetra18").value;
            let letra19 = document.getElementById("inLetra19").value;
            let letra20 = document.getElementById("inLetra20").value;

            let letra21 = document.getElementById("inLetra21").value;
            let letra22 = document.getElementById("inLetra22").value;
            let letra23 = document.getElementById("inLetra23").value;
            let letra24 = document.getElementById("inLetra24").value;
            let letra25 = document.getElementById("inLetra25").value;

            juegoAdivinanza(letra1, letra2, letra3, letra4, letra5, letra6, letra7, letra8, letra9, letra10, letra11, letra12, letra13, letra14, letra15, letra16, letra17, letra18, letra19, letra20, letra21, letra22, letra23, letra24, letra25);
        }

        function pista() {
            darPista();
        }

        function rendir() {
            rendirse();
        }

    </script>

</body>
</html>