package apiRest.database.controller;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import apiRest.MyBatisUtil;
import apiRest.database.classe.Worker;
import apiRest.database.mapper.WorkerMapper;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/worker")
public class WorkerController {

	///////////////////////////////////////////////////// INSERT//////////////////////////////////////////////////////////////
	@RequestMapping(value = "insert", method = RequestMethod.POST)
	public void insert(@RequestBody Worker worker) {
		SqlSession session = MyBatisUtil.getSession();
		try {
			WorkerMapper mapper = session.getMapper(WorkerMapper.class);
			mapper.insertWorker(worker);
			session.commit();
		} catch (Exception e) {
			session.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
	}

	///////////////////////////////////////////////////// GET//////////////////////////////////////////////////////////////
	@RequestMapping(value = "all", method = RequestMethod.GET)
	public List<Worker> getAll() {
		SqlSession session = MyBatisUtil.getSession();
		List<Worker> workers = null;
		try {
			WorkerMapper mapper = session.getMapper(WorkerMapper.class);
			workers = mapper.selectAllWorkers();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
		return workers;
	}
	
	@RequestMapping(value = "selectWorkersFromPlayer", method = RequestMethod.GET)
	public List<Worker> getWorkersByIdPlayer(@RequestParam long id) {
		SqlSession session = MyBatisUtil.getSession();
		List<Worker> workers = null;
		try {
			WorkerMapper mapper = session.getMapper(WorkerMapper.class);
			workers = mapper.selectWorkersByIdWithoutJob(id);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
		return workers;
	}

}
