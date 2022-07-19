<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/vistas/includes/cabecera.jsp" %>
<body>
<br>
<div class="table-responsive d-flex flex-column align-items-center">
<table style="width: 60%;" class="table table-dark table-border border-light text-center">
<thead>
    <tr>
      <th colspan="3" scope="col">TÚ POSICION</th>
    </tr>
    <tr>
      <th scope="col">Rango</th>
      <th scope="col">Usuario</th>
      <th scope="col">Puntos</th>
    </tr>
  </thead>
  <tbody>
  <c:forEach items="${rankings}" var="ranking">
  <c:if test="${ranking.nickname == sessionScope.usuario.nickname}">
    <tr>
  	  <td>#${ranking.id}</td>
      <td>${ranking.nickname}</td>
      <td>${ranking.score}</td>
    </tr>
  </c:if>
  </c:forEach>
  </tbody>
</table>
<br><br>
<table style="width: 60%;" class="table table-dark table-border border-light text-center">
  <thead>
  <tr>
      <th colspan="3" scope="col">TOP #100 MUNDIAL</th>
    </tr>
    <tr>
      <th scope="col">Rango</th>
      <th scope="col">Usuario</th>
      <th scope="col">Puntos</th>
    </tr>
  </thead>
  <tbody>
  <c:forEach items="${rankings}" var="ranking">
  <c:choose>
  	<c:when test="${ranking.nickname == sessionScope.usuario.nickname}">
    	<tr>
      		<td style="background-color: grey">#${ranking.id}</td>
      		<td style="background-color: grey">${ranking.nickname}</td>
      		<td style="background-color: grey">${ranking.score}</td>
    	</tr>
    </c:when>
    <c:otherwise>
    	<tr>
      		<td>#${ranking.id}</td>
      		<td>${ranking.nickname}</td>
      		<td>${ranking.score}</td>
    	</tr>
    </c:otherwise>
  </c:choose>
  </c:forEach>
  </tbody>
</table>
</div>
</body>
