package apiRest.database.mapper;

import java.util.List;

import apiRest.database.classe.Worker;

public interface WorkerMapper {

	public List<Worker> selectAllWorkersOrderByGolds();
	public List<Worker> selectWorkersOfPlayerId(long id);
	
	public void insertWorker(Worker worker);
	
	
	
	
	
}
