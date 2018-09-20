package apiRest.database.controller;

import org.apache.ibatis.session.SqlSession;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import apiRest.MyBatisUtil;
import apiRest.database.classe.Recipe;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/recipe")
public class RecipeController {

	///////////////////////////////////////////////////// INSERT//////////////////////////////////////////////////////////////
	@RequestMapping(value = "/addRecipe", method = RequestMethod.POST)
	public void insert(@RequestBody Recipe recipe) {
		SqlSession session = MyBatisUtil.getSession();
		/*Player result = null;
		try {
			final PlayerMapper playerMapper = session.getMapper(PlayerMapper.class);
			playerMapper.insertPlayer(player);
			final WorkerMapper workerMapper = session.getMapper(WorkerMapper.class);
			List<Worker> freeWorkers = workerMapper.selectFreeWorkers();
			for (Worker worker : freeWorkers) {
				addWorkerToPlayer(player.getId(), worker, playerMapper);
			}
			session.commit();
			result = getFullPlayer(player.getName(), player.getPassword(), playerMapper);
		} catch (Exception e) {
			session.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
		return result;*/
	}

}
