package apiRest.database.mapper;

import java.util.Map;

import apiRest.database.classe.Player;

public interface PlayerMapper {
	
	public Player selectPlayer(Map<String, String> map);
	
	public Player selectPlayerById(int id);
	
	public void insertPlayer(Player player);
	
	public void updateStoneQuantity(Player player);
	
	public void updateWoodQuantity(Player player);
	
	public void updateLeatherQuantity(Player player);
	
	public void updateHerbQuantity(Player player);
	
	public void updateQuantities(Player player);
	
}
