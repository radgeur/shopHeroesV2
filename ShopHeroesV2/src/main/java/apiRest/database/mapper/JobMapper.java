package apiRest.database.mapper;

import java.util.Map;

import apiRest.database.classe.Job;

public interface JobMapper {

	public Job selectJobById(int id);
	
	public void insertJob(Map<String, String> map);
	
}
