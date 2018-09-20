package apiRest.database.mapper;

import java.util.List;

import apiRest.database.classe.Recipe;

public interface RecipeMapper {

	public void insertRecipe(Recipe recipe);
	
	public List<Recipe> selectAllRecipes();
	
}
