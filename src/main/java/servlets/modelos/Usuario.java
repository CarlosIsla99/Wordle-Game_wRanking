package servlets.modelos;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class Usuario {
	
	private Long id;
	private String nickname;
	private String email;
	private String password;
	private Long score;
	
	private Map<String, String> errores = new HashMap<>();
	
	public Usuario(Long id, String nickname, String email, String password, Long score) {
		setId(id);
		setNickname(nickname);
		setEmail(email);
		setPassword(password);
		setScore(score);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		
		if (email == null) {
			throw new RuntimeException("No se ha recibido el email");
		}

		if (email.trim().length() <= 0 && !email.trim().matches("^\\w+@\\w+\\.\\w+$")) {
			errores.put("email", "Debes introducir un formato de email válido");
		}
		
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		
		if (email == null) {
			throw new RuntimeException("No se ha recibido el password");
		}
		
		if(password.trim().length()<4) {
			errores.put("password", "La contraseña debe tener al menos 4 carácteres");
		}
		
		this.password = password;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		
//		if (email == null) {
//			throw new RuntimeException("No se ha recibido el nickname");
//		}
		
		if(nickname.trim().length() <= 0 || nickname.trim().length() <= 10) {
			errores.put("nickname", "El nombre debe de tener de 0-10 carácteres");
		}
		
		this.nickname = nickname;
	}

	public Long getScore() {
		return score;
	}

	public void setScore(Long score) {
		this.score = score;
	}

	public Map<String, String> getErrores() {
		return errores;
	}

	@Override
	public int hashCode() {
		return Objects.hash(email, errores, id, nickname, password, score);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Usuario other = (Usuario) obj;
		return Objects.equals(email, other.email) && Objects.equals(errores, other.errores)
				&& Objects.equals(id, other.id) && Objects.equals(nickname, other.nickname)
				&& Objects.equals(password, other.password) && Objects.equals(score, other.score);
	}

	@Override
	public String toString() {
		return "Usuario [id=" + id + ", nickname=" + nickname + ", email=" + email + ", password=" + password
				+ ", score=" + score + ", errores=" + errores + "]";
	}

}
