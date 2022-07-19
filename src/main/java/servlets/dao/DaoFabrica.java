package servlets.dao;

public class DaoFabrica {

	private DaoUsuario daoUsuario;
	
	public DaoFabrica(String tipoDao) {
		this(tipoDao, null, null, null, null);
	}
	
	public DaoFabrica(String tipoDao, String url, String user, String pass, String driver) {
		switch(tipoDao) {
		case "mysql":
			daoUsuario = new DaoUsuarioMysql(url, user, pass, driver);
			break;
		default:
			throw new DaoException("No conozco ese tipo " + tipoDao);
		}
	}
	
	public DaoUsuario getDaoUsuario() {
		return daoUsuario;
	}
	
}
