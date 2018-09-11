package apiRest.database.controller;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import apiRest.MyBatisUtil;
import apiRest.database.classe.Player;
import apiRest.database.mapper.PlayerMapper;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/player")
public class PlayerController {

	@RequestMapping(method = RequestMethod.GET)
	public Player getPlayer(@RequestParam(value="name") String name, @RequestParam(value="password") String password) {
		SqlSession session = MyBatisUtil.getSession();
		Map<String, String> map = new HashMap<>();
		map.put("name", name);
		map.put("password", password);
		Player result = null;
		try {
			final PlayerMapper mapper = session.getMapper(PlayerMapper.class);
			result = mapper.selectPlayer(map);
		} catch (Exception e) {
		} finally {
			session.close();
		}
		return result;
	}
	
	@RequestMapping(value = "/signup", method = RequestMethod.POST)
	public Player signUp(Player player) {
		SqlSession session = MyBatisUtil.getSession();
		Player result = null;
		try{
			final PlayerMapper mapper = session.getMapper(PlayerMapper.class);
			mapper.insertPlayer(player);
			session.commit();
			result = getPlayer(player.getName(), player.getPassword());
		}catch(Exception e){
			session.rollback();
		}finally{
			session.close();
		}
		return result;
	}
	
	@RequestMapping(value = "/updateStoneQuantity", method = RequestMethod.POST)
	public Player updateStone(@RequestBody Player player, @RequestParam(value="quantity") int quantity) {
		SqlSession session = MyBatisUtil.getSession();
		Player result = null;
		try{
			final PlayerMapper mapper = session.getMapper(PlayerMapper.class);
			result = mapper.selectPlayerById(player.getId());
			result.setStoneQuantity(result.getStoneQuantity() + quantity);
			mapper.updateStoneQuantity(result);
			session.commit();
		}catch(Exception e){
			session.rollback();
		}finally{
			session.close();
		}
		return result;
	}
	
	@RequestMapping(value = "/updateWoodQuantity", method = RequestMethod.POST)
	public Player updateWood(@RequestBody Player player, @RequestParam(value="quantity") int quantity) {
		SqlSession session = MyBatisUtil.getSession();
		Player result = null;
		try{
			final PlayerMapper mapper = session.getMapper(PlayerMapper.class);
			result = mapper.selectPlayerById(player.getId());
			result.setWoodQuantity(result.getWoodQuantity() + quantity);
			mapper.updateWoodQuantity(result);
			session.commit();
		}catch(Exception e){
			session.rollback();
		}finally{
			session.close();
		}
		return result;
	}
	
	@RequestMapping(value = "/updateLeatherQuantity", method = RequestMethod.POST)
	public Player updateLeather(@RequestBody Player player, @RequestParam(value="quantity") int quantity) {
		SqlSession session = MyBatisUtil.getSession();
		Player result = null;
		try{
			final PlayerMapper mapper = session.getMapper(PlayerMapper.class);
			result = mapper.selectPlayerById(player.getId());
			result.setLeatherQuantity(result.getLeatherQuantity() + quantity);
			mapper.updateLeatherQuantity(result);
			session.commit();
		}catch(Exception e){
			session.rollback();
		}finally{
			session.close();
		}
		return result;
	}
	
	@RequestMapping(value = "/updateHerbQuantity", method = RequestMethod.POST)
	public Player udpateHerb(@RequestBody Player player, @RequestParam(value="quantity") int quantity) {
		SqlSession session = MyBatisUtil.getSession();
		Player result = null;
		try{
			final PlayerMapper mapper = session.getMapper(PlayerMapper.class);
			result = mapper.selectPlayerById(player.getId());
			result.setHerbQuantity(result.getHerbQuantity() + quantity);
			mapper.updateHerbQuantity(result);
			session.commit();
		}catch(Exception e){
			session.rollback();
		}finally{
			session.close();
		}
		return result;
	}
	
	@RequestMapping(value="/updateQuantities", method = RequestMethod.POST)
	public Player updateQuantities(@RequestBody Player player,
			@RequestParam(value="stoneQuantity") int stoneQuantity, @RequestParam(value="woodQuantity") int woodQuantity,
			@RequestParam(value="leatherQuantity") int leatherQuantity, @RequestParam(value="herbQuantity") int herbQuantity) {
		SqlSession session = MyBatisUtil.getSession();
		Player result = null;
		try{
			final PlayerMapper mapper = session.getMapper(PlayerMapper.class);
			result = mapper.selectPlayerById(player.getId());
			result.setStoneQuantity(result.getStoneQuantity() + leatherQuantity);
			result.setWoodQuantity(result.getWoodQuantity() + woodQuantity);
			result.setLeatherQuantity(result.getLeatherQuantity() + leatherQuantity);
			result.setHerbQuantity(result.getHerbQuantity() + herbQuantity);
			mapper.updateQuantities(result);
			session.commit();
		}catch(Exception e){
			session.rollback();
		}finally{
			session.close();
		}
		return result;
	}
}
