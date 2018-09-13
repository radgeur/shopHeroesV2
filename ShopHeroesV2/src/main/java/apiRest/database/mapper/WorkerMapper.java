package apiRest.database.mapper;

import java.util.List;

import apiRest.database.classe.Worker;

public interface WorkerMapper {

	public List<Worker> selectAllWorkers();
	
	public void insertWorker(Worker worker);
	
	public Worker selectWorkerById(long id);
	
}
