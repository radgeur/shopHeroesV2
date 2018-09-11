package apiRest.database.controller;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import apiRest.MyBatisUtil;
import apiRest.database.classe.Worker;
import apiRest.database.mapper.WorkerMapper;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/worker")
public class WorkerController {

	@RequestMapping(value = "all", method = RequestMethod.POST)
	public List<Worker> getAll() {
		SqlSession session = MyBatisUtil.getSession();
		List<Worker> workers = null;
		try{
			WorkerMapper mapper = session.getMapper(WorkerMapper.class);
			workers = mapper.selectAllWorkers();
		}catch(Exception e){
		}finally{
			session.close();
		}
		return workers;
	}
	
}
