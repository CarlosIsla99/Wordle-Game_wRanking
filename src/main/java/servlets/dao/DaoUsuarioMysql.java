package servlets.dao;

import java.sql.*;
import java.util.ArrayList;

import servlets.modelos.Usuario;

class DaoUsuarioMysql implements DaoUsuario {
	
	private String url, user, pass;
		
		private static final String SQL_SELECT = "SELECT * FROM usuarios ORDER BY score DESC";
		private static final String SQL_RANKING = "SELECT  ROW_NUMBER() OVER(ORDER BY score DESC) AS 'rank', nickname, email, password, score FROM usuarios LIMIT 100";
		private static final String SQL_SELECT_ID = "SELECT * FROM usuarios WHERE id = ?";
		private static final String SQL_SELECT_EMAIL = "SELECT * FROM usuarios WHERE email = ?";
		private static final String SQL_COMPROBAR_NICKNAME = "SELECT * FROM usuarios WHERE nickname = ?";
		private static final String SQL_INSERT = "INSERT INTO usuarios (nickname, email, password) VALUES (?, ?, ?)";
		private static final String SQL_UPDATE = "UPDATE usuarios SET nickname = ?, email = ?, password = ? WHERE id = ?";
		private static final String SQL_UPDATE_SCORE = "UPDATE usuarios SET score = ? WHERE id = ?";
		private static final String SQL_DELETE = "DELETE FROM usuarios WHERE id = ?";
		
		public DaoUsuarioMysql(String url, String user, String pass, String driver) {
			this.url = url;
			this.user = user;
			this.pass = pass;
			
			// Esto sólo es necesario en proyectos web
			try {
				Class.forName(driver);
			} catch (ClassNotFoundException e) {
				throw new DaoException("No se ha encontrado el driver de base de datos", e);
			}
		}

		@Override
		public Iterable<Usuario> obtenerTodos() {
			Connection con = null;
			PreparedStatement pst = null;
			ResultSet rs = null;
			
			try {
				con = DriverManager.getConnection(url, user, pass);
				pst = con.prepareStatement(SQL_SELECT);
				rs = pst.executeQuery();
				
				Usuario usuario;
				ArrayList<Usuario> usuarios = new ArrayList<Usuario>();
				
				while(rs.next()) {
					usuario = new Usuario(rs.getLong("id"), rs.getString("nickname"), rs.getString("email"), rs.getString("password"), rs.getLong("score"));
					usuarios.add(usuario);
				}
				
				return usuarios;
				
			} catch (SQLException e) {
				throw new DaoException("No se ha podido obtener el registro", e);
			} finally {
				
				if(rs != null) {
					try {
						con.close();
					} catch (SQLException e) {
					}
				}
				
				if(pst != null) {
					try {
						con.close();
					} catch (SQLException e) {
					}
				}
				
				if(con != null) {
					try {
						con.close();
					} catch (SQLException e) {
					}
				}
			}
			
		}


		@Override
		public Usuario obtenerPorId(Long id) {
			
			try (Connection con = DriverManager.getConnection(url, user, pass);
				PreparedStatement pst = con.prepareStatement(SQL_SELECT_ID);) {
				pst.setLong(1, id);
				
				try (ResultSet rs = pst.executeQuery()) {
					Usuario usuario = null;

					if (rs.next()) {
						usuario = new Usuario(rs.getLong("id"), rs.getString("nickname"), rs.getString("email"), rs.getString("password"), rs.getLong("score"));
					}

					return usuario;
				}
			} catch (SQLException e) {
				throw new DaoException("No se ha podido obtener el registro", e);
			}
		}


		@Override
		public void insertar(Usuario usuario) {
			try (Connection con = DriverManager.getConnection(url, user, pass);
				PreparedStatement pst = con.prepareStatement(SQL_INSERT, Statement.RETURN_GENERATED_KEYS);) {
				pst.setString(1, usuario.getNickname());
				pst.setString(2, usuario.getEmail());
				pst.setString(3, usuario.getPassword());

				pst.executeUpdate();
				
				ResultSet rs = pst.getGeneratedKeys();
				
				if (rs != null && rs.next()) {
				    usuario.setId(rs.getLong(1));
				}
				
			} catch (SQLException e) {
				throw new DaoException("No se ha podido insertar el registro" + e);
			}
		}


		@Override
		public void modificar(Usuario usuario) {
			try (Connection con = DriverManager.getConnection(url, user, pass);
				PreparedStatement pst = con.prepareStatement(SQL_UPDATE);) {
				pst.setString(1, usuario.getNickname());
				pst.setString(2, usuario.getEmail());
				pst.setString(3, usuario.getPassword());
				
				pst.setLong(4, usuario.getId());

				if(pst.executeUpdate() != 1) {
					throw new DaoException("No se ha encontrado el usuario a modificar");
				}
				
			} catch (SQLException e) {
				throw new DaoException("No se ha podido modificar el registro", e);
			}			
		}


		@Override
		public void borrar(Long id) {
			try (Connection con = DriverManager.getConnection(url, user, pass);
					PreparedStatement pst = con.prepareStatement(SQL_DELETE);) {
				
				pst.setLong(1, id);

				if(pst.executeUpdate() != 1) {
					throw new DaoException("No se ha encontrado el usuario a borrar");
				}
				
			} catch (SQLException e) {
				throw new DaoException("No se ha podido modificar el registro", e);
			}
			
		}
		
		@Override
		public Usuario obtenerPorEmail(String email) {
			
			try (Connection con = DriverManager.getConnection(url, user, pass);
				PreparedStatement pst = con.prepareStatement(SQL_SELECT_EMAIL);) {
				pst.setString(1, email);
				
				try (ResultSet rs = pst.executeQuery()) {
					Usuario usuario = null;

					if (rs.next()) {
						usuario = new Usuario(rs.getLong("id"), rs.getString("nickname"), rs.getString("email"), rs.getString("password"), rs.getLong("score"));
					}

					return usuario;
				}
			} catch (SQLException e) {
				throw new DaoException("No se ha podido obtener el registro", e);
			}
		}

		@Override
		public boolean comprobarNickname(String nickname) {
			
			try (Connection con = DriverManager.getConnection(url, user, pass);
					PreparedStatement pst = con.prepareStatement(SQL_COMPROBAR_NICKNAME);) {
					pst.setString(1, nickname);
					
					try (ResultSet rs = pst.executeQuery()) {
						boolean respuesta = false;

						if (rs.next()) {
							respuesta = true;
						}

						return respuesta;
					}
				} catch (SQLException e) {
					throw new DaoException("No se ha podido obtener el registro" + e);
				}
		}

		@Override
		public Iterable<Usuario> obtenerRanking() {
			Connection con = null;
			PreparedStatement pst = null;
			ResultSet rs = null;
			
			try {
				con = DriverManager.getConnection(url, user, pass);
				pst = con.prepareStatement(SQL_RANKING);
				rs = pst.executeQuery();
				
				Usuario usuario;
				ArrayList<Usuario> usuarios = new ArrayList<Usuario>();
				
				while(rs.next()) {
					usuario = new Usuario(rs.getLong("rank"), rs.getString("nickname"), rs.getString("email"), rs.getString("password"), rs.getLong("score"));
					usuarios.add(usuario);
				}
				
				return usuarios;
				
			} catch (SQLException e) {
				throw new DaoException("No se ha podido obtener el registro" + e);
			} finally {
				
				if(rs != null) {
					try {
						con.close();
					} catch (SQLException e) {
					}
				}
				
				if(pst != null) {
					try {
						con.close();
					} catch (SQLException e) {
					}
				}
				
				if(con != null) {
					try {
						con.close();
					} catch (SQLException e) {
					}
				}
			}
		}
		
		@Override
		public void modificarPuntuacion(Usuario usuario) {
			try (Connection con = DriverManager.getConnection(url, user, pass);
				PreparedStatement pst = con.prepareStatement(SQL_UPDATE_SCORE);) {
				pst.setLong(1, usuario.getScore());
				pst.setLong(2, usuario.getId());

				if(pst.executeUpdate() != 1) {
					throw new DaoException("No se ha encontrado el usuario a modificar");
				}
				
			} catch (SQLException e) {
				throw new DaoException("No se ha podido modificar el registro", e);
			}			
		}

}
