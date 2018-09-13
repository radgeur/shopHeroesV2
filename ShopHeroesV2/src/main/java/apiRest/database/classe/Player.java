package apiRest.database.classe;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Player {
	
	private long id;
	private String name;
	private String password;
	private int level;
	private int stoneQuantity;
	private int leatherQuantity;
	private int herbQuantity;
	private int woodQuantity;
	private boolean admin;
	private int golds;
	private List<Worker> workers;
	
}
