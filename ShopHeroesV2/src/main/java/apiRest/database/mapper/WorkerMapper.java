package apiRest.database.mapper;

import java.util.List;

import apiRest.database.classe.Worker;

public interface WorkerMapper {

	public List<Worker> selectAllWorkersOrderByGolds();
	public List<Worker> selectWorkersByPlayerId(long id);
	public List<Worker> selectFreeWorkers();
	
	public void insertWorker(Worker worker);
	
	
	
	
	
}
