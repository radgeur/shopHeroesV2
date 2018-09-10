package apiRest.database.controller;

import org.apache.ibatis.session.SqlSession;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import apiRest.MyBatisUtil;
import apiRest.database.classe.Job;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/job")
public class JobController {
	
	@RequestMapping(method = RequestMethod.POST)
	public void addJob(@RequestParam(value="name") String name) {
		SqlSession session = MyBatisUtil.getSession();
		session.insert("insertJob", new Job(name));
		try{
			session.commit();
		}catch(Exception e){
			session.rollback();
		}finally{
			session.close();
		}
	}

}
