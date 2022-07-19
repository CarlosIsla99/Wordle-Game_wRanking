package servlets.controladores;

import java.io.IOException;

import servlets.modelos.Usuario;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1587748451045724579L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.getRequestDispatcher("/WEB-INF/vistas/login.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String email = request.getParameter("email");
		String password = request.getParameter("password");
		
		Usuario usuario = validarUsuario(email, password);
		
		if(usuario == null) {
			request.setAttribute("alertatexto", "No se ha podido iniciar sesión. Email o contraseña incorrectos.");
			request.setAttribute("alertanivel", "danger");			
			
			request.getRequestDispatcher("/WEB-INF/vistas/login.jsp").forward(request, response);
			return;
		} else {
			request.setAttribute("alertatexto", "Has iniciado sesión");
			request.setAttribute("alertanivel", "success");
			request.getSession().setAttribute("usuario", usuario);
			response.sendRedirect("index");
		}
			
		
	}

	private Usuario validarUsuario(String email, String password) {
		
		Usuario usuarioEncontrado = Globales.DAO_USUARIO.obtenerPorEmail(email);
		
		if(usuarioEncontrado != null && password.equals(usuarioEncontrado.getPassword())) {
			
			return usuarioEncontrado;
		}
		
		return null;
	}

}
