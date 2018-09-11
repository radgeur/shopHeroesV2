package apiRest.database.classe;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Worker {
	
	private int id;
	private String name;
	private Job job;

}
