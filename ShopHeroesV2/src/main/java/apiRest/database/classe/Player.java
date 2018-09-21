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
	private boolean admin;
	private int golds;
	private int xp;
	private List<Material> materials;
	private List<Worker> workers;
	private List<Job> jobs;
	
}
