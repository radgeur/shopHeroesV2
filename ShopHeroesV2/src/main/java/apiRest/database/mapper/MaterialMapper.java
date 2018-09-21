package apiRest.database.mapper;

import java.util.List;
import java.util.Map;

import apiRest.database.classe.Material;

public interface MaterialMapper {

	public void insertMaterialQuantity(Map<String, Object> map);
	
	public List<Material> selectAllMaterials();
	public List<Material> selectMaterialByRecipeId(long idRecipe);
	public List<Material> selectMaterialByPlayerId(long idPlayer);
	
}
