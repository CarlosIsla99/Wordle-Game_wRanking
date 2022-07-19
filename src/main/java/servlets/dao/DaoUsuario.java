package servlets.dao;

import servlets.modelos.Usuario;

public interface DaoUsuario extends Dao<Usuario> {
	Usuario obtenerPorEmail(String email);
	boolean comprobarNickname(String nickname);
	Iterable<Usuario> obtenerRanking();
	void modificarPuntuacion(Usuario usuario);
}
