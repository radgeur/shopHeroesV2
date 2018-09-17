package apiRest.database.mapper;

import java.util.List;

import apiRest.database.classe.Job;

public interface JobMapper {

	public List<Job> selectAllJobs();
	public List<Job> selectJobOfPlayerId(long id);
	public Job selectJobById(long id);
	
	public void insertJob(String name);
	
	
}
