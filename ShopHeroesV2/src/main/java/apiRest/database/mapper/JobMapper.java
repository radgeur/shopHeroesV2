package apiRest.database.mapper;

import java.util.List;
import java.util.Map;

import apiRest.database.classe.Job;

public interface JobMapper {

	public Job selectJobById(long id);
	
	public void insertJob(Map<String, String> map);
	
	public List<Job> selectAllJobs();
	
}
