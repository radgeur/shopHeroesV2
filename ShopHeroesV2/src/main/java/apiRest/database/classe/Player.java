package apiRest.database.classe;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Player {
	
	public Player() {}
	
	public Player(String name, String password) {
		this.name = name;
		this.password = password;
	}
	
	private long id;
	private String name;
	private String password;
	private int level;
	private int stoneQuantity;
	private int leatherQuantity;
	private int herbQuantity;
	private int woodQuantity;
	private boolean admin;
	private int gold;
	
}
