package apiRest.database.controller;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import apiRest.MyBatisUtil;
import apiRest.database.classe.Category;
import apiRest.database.mapper.CategoryMapper;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/category")
public class CategoryController {

	/////////////////////////////////////////////////////INSERT//////////////////////////////////////////////////////////////
	@RequestMapping(method = RequestMethod.POST, value = "add")
	public void addCategory(@RequestParam String name) {
		SqlSession session = MyBatisUtil.getSession();
		try {
			CategoryMapper mapper = session.getMapper(CategoryMapper.class);
			mapper.insertCategory(name);
			session.commit();
		} catch (Exception e) {
			session.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
	}
	
	/////////////////////////////////////////////////////GET//////////////////////////////////////////////////////////////
	@RequestMapping(method = RequestMethod.GET, value = "all")
	public List<Category> getAll() {
		SqlSession session = MyBatisUtil.getSession();
		List<Category> result = null;
		try {
			CategoryMapper mapper = session.getMapper(CategoryMapper.class);
			result = mapper.selectAllCategories();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
		return result;
	}

}
