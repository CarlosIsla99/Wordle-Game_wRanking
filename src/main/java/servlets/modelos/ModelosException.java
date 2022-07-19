package servlets.modelos;

public class ModelosException extends RuntimeException {

	private static final long serialVersionUID = 1064719567761416137L;

	public ModelosException() {
		super();
	}

	public ModelosException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public ModelosException(String message, Throwable cause) {
		super(message, cause);
	}

	public ModelosException(String message) {
		super(message);
	}

	public ModelosException(Throwable cause) {
		super(cause);
	}

}
