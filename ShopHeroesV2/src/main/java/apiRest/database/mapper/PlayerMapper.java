package apiRest.database.mapper;

import java.util.Map;

import apiRest.database.classe.Player;

public interface PlayerMapper {
	
	public Player selectPlayer(Map<String, String> map);
	public Player selectPlayerById(long id);
	
	public void insertPlayer(Player player);
	public void insertPlayerWorkerJob(Map<String, Integer> map);

	public void updateQuantityForPlayerByMaterialId(Map<String, Long> map);
	public void updateQuantities(Player player);
	public void updateGolds(Player player);
	
}
