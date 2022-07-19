<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/vistas/includes/cabecera.jsp" %>
<body>
	<form autocomplete="off" class="container text-center mt-4" action="login" method="POST">
		<div class="form-row row justify-content-center">
			<label class="" for="exampleInputEmail1"><b>Email</b></label>
			<input type="email" class="form-control border border-dark w-25" name="email" value="${usuario.email}" id="exampleInputEmail1" aria-describedby="emailHelp" required="required" placeholder="Email"> 
		</div>
		<div class="form-row row justify-content-center mt-2">
			<label for="exampleInputPassword1"><b>Comtraseña</b></label>
			<input type="password" class="form-control border border-dark w-25" name="password" id="exampleInputPassword1" required="required" placeholder="Contraseña">
		</div>
		<div class="buton">
			<button type="submit" class="btn btn-primary border border-dark mt-3 ml-3">Entrar</button>
		</div>
		<div class="error mt-3">
			<span class="text-danger">${error}</span>
		</div>
	</form>
</body>