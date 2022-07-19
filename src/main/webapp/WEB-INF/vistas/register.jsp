<%@ include file="/WEB-INF/vistas/includes/cabecera.jsp" %>
<body>

<form class="text-center" autocomplete="off" method="POST" action="register">
  <div class="d-flex flex-column align-items-center">
  <div class="form-group col-3 mt-3">
      <label for="inputEmail4"><b>Nickname</b></label>
      <input type="text" name="nickname" value="${usuario.nickname}" class="form-control border border-dark" placeholder="Nickname" required="required">
      <span class="text-danger">${usuario.errores.nickname} ${error_nickname}</span>
    </div>
    <div class="form-group col-3 mt-3">
      <label for="inputEmail4"><b>Email</b></label>
      <input type="email" name="email" value="${usuario.email}" class="form-control border border-dark" placeholder="Email" required="required">
      <span class="text-danger">${usuario.errores.email} ${error_email}</span>
    </div>
    <div class="form-group col-3 mt-3">
      <label for="inputPassword4"><b>Contraseña</b></label>
      <input type="password" name="contra1" value="${usuario.password}" class="form-control border border-dark" placeholder="Contraseña" required="required">
      <span class="text-danger">${usuario.errores.password}</span>
    </div>
    <div class="form-group col-3 mt-3">
      <label for="inputPassword4"><b>Confirmar Contraseña</b></label>
      <input type="password" name="contra2" value="${usuario.password}" class="form-control border border-dark" placeholder="Confirmar Contraseña" required="required">
	  <span class="text-danger">${error_password}</span>
    </div>
  </div>
  <div class="buton">
    <button type="submit" class="btn btn-primary border border-dark mt-3">Enviar</button>

  </div>
</form>
</body>