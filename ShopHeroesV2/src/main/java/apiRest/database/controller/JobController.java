package apiRest.database.controller;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import apiRest.MyBatisUtil;
import apiRest.database.classe.Job;
import apiRest.database.mapper.JobMapper;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/job")
public class JobController {

	///////////////////////////////////////////////////// INSERT//////////////////////////////////////////////////////////////
	@RequestMapping(method = RequestMethod.POST, value = "add")
	public void addJob(@RequestBody Job job) {
		SqlSession session = MyBatisUtil.getSession();
		try {
			JobMapper mapper = session.getMapper(JobMapper.class);
			mapper.insertJob(job);
			session.commit();
		} catch (Exception e) {
			session.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
	}

	///////////////////////////////////////////////////// GET//////////////////////////////////////////////////////////////
	@RequestMapping(method = RequestMethod.GET, value = "selectAll")
	public List<Job> selectAll() {
		SqlSession session = MyBatisUtil.getSession();
		List<Job> result = null;
		try {
			JobMapper mapper = session.getMapper(JobMapper.class);
			result = mapper.selectAllJobs();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
		return result;
	}

}
