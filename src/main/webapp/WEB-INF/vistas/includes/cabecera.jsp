<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Nicolas Wordle</title>
<base href="${pageContext.request.contextPath}/">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="icon" type="image/x-icon" href="img/icon.png">
<link href="css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="css/index.css">
<script src="js/jquery-3.6.0.min.js"></script>
<script src="js/index.js"></script>
<script src="js/db_connection.js"></script>
<script src="js/confetti-falling-animation/confetti.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>
</head>
<header>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between py-3">
  <a class="navbar-brand px-2" href="index"><img id="logo" src="img/icon.png" alt="Nicolas Cage">Nicolas Wordle</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
		<ul class="navbar-nav ml-3 mb-2 mb-lg-0">
			<c:choose>
				<c:when test="${sessionScope.usuario == null}">
					<div class="register-login-btn">
						<a href="register" type="button" class="btn btn-success text-center">Register</a>
						<a href="login" type="button" class="btn btn-success text-center mx-3">Login</a>
					</div>
				</c:when>
				<c:otherwise>
				<span class="navbar-text mx-3"> ${sessionScope.usuario.nickname} </span>
				<div class="d-flex flex-row">
					<a href="user/ranking?id=${sessionScope.usuario.id}" type="button" class="btn btn-outline-success text-center px-3 mx-2">Ranking</a>
	  			</div>
					<div class="d-flex flex-row">
						<a href="logout" type="button" class="btn btn-outline-danger text-center px-3 mx-2">Logout</a>
					</div>
				</c:otherwise>
			</c:choose>
		</ul>
</nav>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-6 mt-4">
			<c:if test="${alertatexto != null}">
				<div class="alert alert-${alertanivel} alert-dismissible fade show" role="alert"> ${alertatexto}
					<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
				</div>
			</c:if>
		</div>
	</div>
</div>
</header>