package apiRest.database.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import apiRest.MyBatisUtil;
import apiRest.database.classe.Material;
import apiRest.database.classe.Player;
import apiRest.database.classe.Worker;
import apiRest.database.mapper.MaterialMapper;
import apiRest.database.mapper.PlayerMapper;
import apiRest.database.mapper.WorkerMapper;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/player")
public class PlayerController {

	/////////////////////////////////////////////////////INSERT//////////////////////////////////////////////////////////////
	@RequestMapping(value = "/signup", method = RequestMethod.POST)
	public Player signUp(@RequestBody Player player) {
		SqlSession session = MyBatisUtil.getSession();
		Player result = null;
		try {
			//insertPlayer
			final PlayerMapper playerMapper = session.getMapper(PlayerMapper.class);
			playerMapper.insertPlayer(player);
			
			//add free workers
			final WorkerMapper workerMapper = session.getMapper(WorkerMapper.class);
			List<Worker> freeWorkers = workerMapper.selectFreeWorkers();
			for (Worker worker : freeWorkers) {
				addWorkerToPlayer(player.getId(), worker, playerMapper);
			}
			
			//initialize all materials for the player at 0
			MaterialMapper materialMapper = session.getMapper(MaterialMapper.class);
			List<Material> materials = materialMapper.selectAllMaterials();
			Map<String, Long> map = new HashMap<>();
			for(Material material : materials) {
				map.put("player", player.getId());
				map.put("material", material.getId());
				map.put("quantity", 0L);
				playerMapper.insertPlayerMaterial(map);
				map.clear();
			}
			session.commit();
			result = getFullPlayer(player.getName(), player.getPassword(), playerMapper);
		} catch (Exception e) {
			session.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
		return result;
	}

	@RequestMapping(value = "/addWorkerToPlayer", method = RequestMethod.POST)
	public void insertPlayerWorkerJob(@RequestBody Worker worker, @RequestParam int idPlayer) {
		SqlSession session = MyBatisUtil.getSession();
		try {
			final PlayerMapper playerMapper = session.getMapper(PlayerMapper.class);
			addWorkerToPlayer(idPlayer, worker, playerMapper);
			Player player = playerMapper.selectPlayerById(idPlayer);
			player.setGolds(player.getGolds() - worker.getGolds());
			playerMapper.updateGolds(player);
			session.commit();
		} catch (Exception e) {
			session.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
	}

	/////////////////////////////////////////////////////GET//////////////////////////////////////////////////////////////
	@RequestMapping(value = "/infos", method = RequestMethod.POST)
	public Player getFullPlayerInfos(@RequestBody Player player) {
		SqlSession session = MyBatisUtil.getSession();
		Player result = null;
		try {
			final PlayerMapper playerMapper = session.getMapper(PlayerMapper.class);
			result = getFullPlayer(player.getName(), player.getPassword(), playerMapper);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
		return result;
	}

	@RequestMapping(method = RequestMethod.GET)
	public Player getPlayer(@RequestParam int id) {
		SqlSession session = MyBatisUtil.getSession();
		Player result = null;
		try {
			final PlayerMapper playerMapper = session.getMapper(PlayerMapper.class);
			result = playerMapper.selectPlayerById(id);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
		return result;
	}

	/////////////////////////////////////////////////////UPDATE//////////////////////////////////////////////////////////////
	@RequestMapping(value = "udpateMaterialQuantity", method = RequestMethod.POST)
	public Player updateMaterialQuantity(@RequestBody Player player) {
		SqlSession session = MyBatisUtil.getSession();
		try {
			final PlayerMapper mapper = session.getMapper(PlayerMapper.class);
			Map<String, Long> map = new HashMap<>();
			for(Material material: player.getMaterials()) {
				map.put("player", player.getId());
				map.put("material", material.getId());
				map.put("quantity", new Long(material.getQuantity()));
				mapper.updateQuantityForPlayerByMaterialId(map);
				map.clear();
			}
			player = mapper.selectPlayerById(player.getId());
			session.commit();
		} catch (Exception e) {
			e.printStackTrace();
			session.rollback();
		} finally {
			session.close();
		}
		return player;
	}

	/*
	 * @RequestMapping(value = "/updateQuantities", method = RequestMethod.POST)
	 * public Player updateQuantities(@RequestBody Player player, @RequestParam int
	 * stoneQuantity,
	 * 
	 * @RequestParam int woodQuantity, @RequestParam int
	 * leatherQuantity, @RequestParam int herbQuantity) { SqlSession session =
	 * MyBatisUtil.getSession(); Player result = null; try { final PlayerMapper
	 * mapper = session.getMapper(PlayerMapper.class); result =
	 * mapper.selectPlayerById(player.getId());
	 * result.setStoneQuantity(result.getStoneQuantity() + leatherQuantity);
	 * result.setWoodQuantity(result.getWoodQuantity() + woodQuantity);
	 * result.setLeatherQuantity(result.getLeatherQuantity() + leatherQuantity);
	 * result.setHerbQuantity(result.getHerbQuantity() + herbQuantity);
	 * mapper.updateQuantities(result); session.commit(); } catch (Exception e) {
	 * session.rollback(); e.printStackTrace(); } finally { session.close(); }
	 * return result; }
	 */

	////////////////////////////////////////////////////////OTHER//////////////////////////////////////////////////////////
	private Player getFullPlayer(String name, String password, PlayerMapper mapper) {
		Map<String, String> map = new HashMap<>();
		map.put("name", name);
		map.put("password", password);
		return mapper.selectPlayer(map);
	}

	private void addWorkerToPlayer(long id, Worker worker, PlayerMapper mapper) {
		Map<String, Object> map = new HashMap<>();
		map.put("player", id);
		map.put("worker", worker.getId());
		map.put("job", worker.getJob().getId());
		mapper.insertPlayerWorkerJob(map);
	}
}
