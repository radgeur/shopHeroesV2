package apiRest.database.classe;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Job {

	public Job() {}
	
	public Job(String name) {
		this.name = name;
	}
	
	private int id;
	private String name;
	
}
