package servlets.filtros;

import java.io.IOException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import servlets.modelos.Usuario;

@WebFilter("/user/*")
public class LoginFilter extends HttpFilter {

	private static final long serialVersionUID = 3132045944508153674L;

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

		HttpServletRequest httpRequest = (HttpServletRequest)request;
		HttpServletResponse httpResponse = (HttpServletResponse)response;
		HttpSession session = httpRequest.getSession();
		
		Usuario usuario = (Usuario) session.getAttribute("usuario");
		
		if(usuario == null) {
			httpRequest.setAttribute("alertatexto", "Debes estar logueado para acceder");
			httpRequest.setAttribute("alertanivel", "danger");
			httpRequest.getRequestDispatcher("/login").forward(httpRequest, httpResponse);
			return;
		}
		
		chain.doFilter(request, response);
	}

}
