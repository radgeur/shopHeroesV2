package apiRest.database.mapper;

import apiRest.database.classe.Player;

public interface PlayerMapper {

	public void insertPlayer(Player player);
	
	public Player selectPlayer(String name, String password);
	
}
