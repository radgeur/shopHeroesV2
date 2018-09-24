package apiRest.database.classe;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Recipe {
	
	private long id;
	private String name;
	private Category category;
	private int minLevel;
	private int golds;
	private int xp;
	private Job job;
	private List<Material> materials;

}
