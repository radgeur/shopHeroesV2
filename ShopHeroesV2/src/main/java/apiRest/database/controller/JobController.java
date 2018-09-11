package apiRest.database.controller;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import apiRest.MyBatisUtil;
import apiRest.database.mapper.JobMapper;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/job")
public class JobController {
	
	@RequestMapping(method = RequestMethod.POST)
	public void addJob(@RequestParam(value="name") String name) {
		SqlSession session = MyBatisUtil.getSession();
		try{
			JobMapper mapper = session.getMapper(JobMapper.class);
			Map<String, String> map = new HashMap<>();
			map.put("name", name);
			mapper.insertJob(map);
			session.commit();
		}catch(Exception e){
			session.rollback();
		}finally{
			session.close();
		}
	}

}
