package servlets.controladores;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import servlets.modelos.Usuario;

@WebServlet("/puntuacionServlet")
public class PuntuacionServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1587748451045724579L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.getRequestDispatcher("/WEB-INF/vistas/index.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		HttpSession session = request.getSession();
		
		Usuario user = (Usuario) session.getAttribute("usuario");
		
		Usuario usuario = Globales.DAO_USUARIO.obtenerPorId(user.getId());
		usuario.setScore(usuario.getScore()+10);

		Globales.DAO_USUARIO.modificarPuntuacion(usuario);

	}

}
