package servlets.controladores;

import java.io.IOException;
import java.util.Properties;

import servlets.dao.DaoException;
import servlets.dao.DaoFabrica;
import servlets.dao.DaoUsuario;

public class Globales {
	
	static final DaoUsuario DAO_USUARIO;
	
	private static final String CONFIGURACION = "configuracion.properties"; 
	
	static {
		try {
			Properties props = new Properties();
			props.load(Globales.class.getClassLoader().getResourceAsStream(CONFIGURACION));
			
			String tipo = props.getProperty("dao.tipodao");
			String url = props.getProperty("dao.url");
			String user = props.getProperty("dao.user");
			String pass = props.getProperty("dao.pass");
			String driver = props.getProperty("dao.driver");
			
			DaoFabrica fabrica = new DaoFabrica(tipo, url, user, pass, driver);
			
			DAO_USUARIO = fabrica.getDaoUsuario();
		} catch (IOException e) {
			throw new DaoException("No se ha podido obtener la configuración");
		}
	}
}
