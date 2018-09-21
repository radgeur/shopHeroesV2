package apiRest.database.controller;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import apiRest.MyBatisUtil;
import apiRest.database.classe.Material;
import apiRest.database.mapper.MaterialMapper;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/material")
public class MaterialController {

	/////////////////////////////////////////////////////GET//////////////////////////////////////////////////////////////
	@RequestMapping(method = RequestMethod.GET, value = "all")
	public List<Material> getAll() {
		SqlSession session = MyBatisUtil.getSession();
		List<Material> result = null;
		try {
			MaterialMapper mapper = session.getMapper(MaterialMapper.class);
			result = mapper.selectAllMaterials();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
		return result;
	}
	
}
